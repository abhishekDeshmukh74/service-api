import { Request, Response } from 'express';
import axios from 'axios';

import { CONSTANTS } from '@constants';
import { handleException } from './../../config/error-handler';
import { SubscriptionRequest } from './subscriber.interfaces';
import { sign } from 'jsonwebtoken';

axios.defaults.baseURL = ' http://localhost:3000';

class SubscriberController {
  async subscribeToAPI(req: Request | any, res: Response) {
    try {
      const subscriptionRequest: SubscriptionRequest = req.body;

      await axios.post('/users', subscriptionRequest);

      const token = await sign(
        {
          email: subscriptionRequest.email,
          name: subscriptionRequest.name,
          subscriptionTier: subscriptionRequest.subscriptionTier,
        },
        CONSTANTS.JWT_SECRET,
      );

      res.status(CONSTANTS.STATUS.OK).json({
        message: 'Subscription successful. Use the sent token to use our API',
        token,
      });
    } catch (e) {
      handleException('subscribeToAPI', e, res);
    }
  }
}

export const subscriberController = new SubscriberController();
