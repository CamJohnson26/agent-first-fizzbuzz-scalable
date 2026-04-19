import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { V86Service } from './v86-service.js';
import { Logger } from './logger.js';

@injectable()
export class EventHandler {
  constructor(
    @inject(V86Service) private v86Service: V86Service,
    @inject(Logger) private logger: Logger
  ) {}

  public pushHandler = async (req: Request, res: Response) => {
    const { event } = req.body;
    if (!event) {
      return res.status(400).json({ error: 'Event data is required' });
    }
    const success = await this.v86Service.push(event);
    if (success) {
      res.json({ status: 'pushed', event });
    } else {
      this.logger.warn('Failed to push event to V86 queue', { event });
      res.status(503).json({ error: 'Event queue not ready' });
    }
  };

  public popHandler = async (req: Request, res: Response) => {
    const event = await this.v86Service.pop();
    if (event) {
      res.json({ event });
    } else {
      res.status(204).end();
    }
  };

  public statsHandler = async (req: Request, res: Response) => {
    const count = await this.v86Service.getCount();
    res.json({ count, vmReady: this.v86Service.isVMReady() });
  };
}
