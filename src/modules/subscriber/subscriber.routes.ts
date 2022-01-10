import { Router, Request, Response } from 'express';

import { ensureAuthenticated } from './../../config/middlewares/ensure-authenticated.middleware';
import { subscriberController } from './subscriber.controller';

class SubscriberRoutes {

  private router: Router = Router();

  get routes() {

    this.router.post(
      '/subscribe',
      // ensureAuthenticated,
      (req: Request, res: Response) => {
        subscriberController.subscribeToAPI(req, res);
      },
    );

    return this.router;

  }

}

export const subscriberRoutes = new SubscriberRoutes();
