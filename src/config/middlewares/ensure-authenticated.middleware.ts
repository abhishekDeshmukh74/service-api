import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { CONSTANTS } from '@constants';

export async function ensureAuthenticated(req: Request | any, res: Response, next: NextFunction) {
  try {

    let bearerToken: string = null;

    if (req.headers?.authorization) {
      const parted = req.headers.authorization.split(' ');
      if (parted.length === 2) {
        bearerToken = parted[1];
      }
    }

    if (!bearerToken) {
      return res.status(CONSTANTS.STATUS.UNAUTHORIZED).json({
        message: CONSTANTS.MESSAGES.ERROR.TOKEN_REQUIRED,
      });
    }

    const decoded: any = await verify(bearerToken, CONSTANTS.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (e) {

    let message = CONSTANTS.MESSAGES.ERROR.DEFAULT_TEXT;

    if (e.name === 'JsonWebTokenError') {
      message = CONSTANTS.MESSAGES.ERROR.INVALID_AUTH_TOKEN;
    }

    if (e.name === 'TokenExpiredError') {
      message = CONSTANTS.MESSAGES.ERROR.TOKEN_EXPIRED;
    }

    if (e.name === 'NotBeforeError') {
      message = CONSTANTS.MESSAGES.ERROR.TOKEN_BEFORE_ACTIVE;
    }

    return res.status(CONSTANTS.STATUS.UNAUTHORIZED).json({
      message,
      error: e,
    });
  }
}
