export interface ITransport {
  id: string;

  collisionId?: string;

  status: string;

  createdDate: Date;

  number_transport: string;

  number_trailer: string;

  driver: string;

  devices: IDevice[];
}

export interface IDevice {
  number: string;
  damaged: boolean;
}
