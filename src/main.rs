#![feature(duration_constants)]

use std::error;
use std::net::SocketAddr;
use std::path::Path;
use std::time::Duration;

use futures::{SinkExt, StreamExt};

use tokio::prelude::*;

use warp::http::StatusCode;
use warp::reply::Reply;
use warp::ws::{WebSocket, Ws};
use warp::Filter;

use tokio_serial::{Serial, SerialPortSettings};

type Error = Box<dyn error::Error>;
type Result<T> = std::result::Result<T, Error>;

fn get_ports() -> Result<Vec<String>> {
    let ports = mio_serial::available_ports()?;
    Ok(ports.into_iter().map(|port| port.port_name).collect())
}

async fn talk_to_port(socket: WebSocket, port: Serial) {
    let (mut sock_tx, mut sock_rx) = socket.split();

    let (mut port_rx, mut port_tx) = tokio::io::split(port);

    tokio::spawn(async move {
        loop {
            let msg = sock_rx.next().await.unwrap();

            let msg = msg.unwrap();

            port_tx.write_all(msg.as_bytes()).await.unwrap();
        }
    });

    tokio::spawn(async move {
        loop {
            let mut buf = [0; 1024];
            let bytes_read = port_rx.read(&mut buf).await.unwrap();

            let msg = warp::ws::Message::binary(&buf[..bytes_read]);

            sock_tx.send(msg).await.unwrap();
        }
    });
}

fn get_ports_handler() -> impl Reply {
    get_ports()
        .map(|ports| warp::reply::json(&ports).into_response())
        .unwrap_or_else(|err| {
            let err_msg = format!("Error getting serial ports: {}", err);
            warp::reply::with_status(err_msg, StatusCode::INTERNAL_SERVER_ERROR).into_response()
        })
}

fn open_port_handler(path: String, ws: Ws) -> impl Reply {
    use tokio_serial::{DataBits, FlowControl, Parity, StopBits};
    const SETTINGS: SerialPortSettings = SerialPortSettings {
        baud_rate: 0,
        data_bits: DataBits::Eight,
        flow_control: FlowControl::None,
        parity: Parity::None,
        stop_bits: StopBits::One,
        timeout: Duration::SECOND,
    };

    let path = Path::new(&path);
    let port = Serial::from_path(path, &SETTINGS).unwrap();

    ws.on_upgrade(move |socket| talk_to_port(socket, port));

    warp::reply::reply()
}

#[tokio::main]
async fn main() {
    let addr: SocketAddr = "127.0.0.1:3030".parse().unwrap();

    let get_ports_route = warp::path("ports").and(warp::get()).map(get_ports_handler);
    let open_port_route = warp::path!("ports" / String)
        .and(warp::ws())
        .map(open_port_handler);

    let routes = get_ports_route.or(open_port_route);

    let server = warp::serve(routes);

    println!("Server listening on: {}", addr);
    server.bind(addr).await;
}
