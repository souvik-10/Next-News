import { Response } from 'express';

interface Client {
  id: string;
  res: Response;
}

class SSEBroadcaster {
  private clients: Client[] = [];

  public addClient(id: string, res: Response) {
    this.clients.push({ id, res });
  }

  public removeClient(id: string) {
    this.clients = this.clients.filter((client) => client.id !== id);
  }

  public broadcast(event: string, data: any) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach((client) => {
      client.res.write(payload);
    });
  }
}

export const sseBroadcaster = new SSEBroadcaster();
