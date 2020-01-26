export enum DataBits {
  Five,
  Six,
  Seven,
  Eight,
}

export enum FlowControl {
  None,
  Software,
  Hardware,
}

export enum Parity {
  None,
  Odd,
  Even,
}

export enum StopBits {
  One,
  Two,
}

export class PortSettings {
  baudRate: number = 11520;
  dataBits: DataBits = DataBits.Eight;
  flowControl: FlowControl = FlowControl.Hardware;
  parity: Parity = Parity.None;
  stopBits: StopBits = StopBits.One;
}
