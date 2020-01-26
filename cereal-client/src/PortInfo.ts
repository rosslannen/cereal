class PortInfo {
  name: string;
  pid: number;
  vid: number;
  serialNumber: string;
  manufacturer: string;
  product: string;

  constructor(name: string, vid: number, pid: number, serialNumber: string, manufacturer: string, product: string) {
    this.name = name;
    this.vid = vid;
    this.pid = pid;
    this.serialNumber = serialNumber;
    this.manufacturer = manufacturer;
    this.product = product;
  }
}

export default PortInfo;
