import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { CONSTANTS } from '@constants';
import { handleException } from './error-handler';

export async function authentication(req: Request | any, res: Response, next: NextFunction) {
  try {

    let bearerToken: string = null;

    if (req.headers?.authorization) {
      const parted = req.headers.authorization.split(' ');
      if (parted.length === 2) {
        bearerToken = parted[1];
      }
    }

    if (bearerToken) {
      const decoded: any = await verify(bearerToken, CONSTANTS.JWT_SECRET);
      req.user = decoded;
    }

  } catch (error) {
    handleException('getPageViewsByUrl', error, null, false);
  } finally {
    next();
  }
}
