import { CONSTANTS } from '@constants';
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { createClient } from 'redis';

import { SubscriptionRequest } from './../modules/subscriber/subscriber.interfaces';
import { handleException } from './../config/error-handler';

let redisClient: any;
(async () => {
  redisClient = createClient();
  redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));
  await redisClient.connect();
})();

const WINDOW_DURATION_IN_HOURS = 24;
const WINDOW_LOG_DURATION_IN_HOURS = 1;

export const getMaxRequestCount = (user: SubscriptionRequest | any) => {
  CONSTANTS.TIER_CONFIG.find((e) => {
    return e.name === user.subscriptionTier;
  });
};

export const customLimiter = async (req: Request | any, res: Response, next: NextFunction) => {
  try {

    if (!redisClient) {
      handleException('subscribeToAPI', new Error('Redis client does not exist!'), res);
    }

    // Gets the records of the current user base on the IP address, returns a null if the is no user found
    const record = await redisClient.get(req.ip);
    const currentTime = moment();
    // When there is no user record then a new record is created for the user and stored in the Redis storage
    if (!record) {
      const newRecord = [];
      const requestLog = {
        requestTimeStamp: currentTime.unix(),
        requestCount: 1,
      };
      newRecord.push(requestLog);
      redisClient.set(req.ip, JSON.stringify(newRecord));
      next();
    }

    // When the record is found then its value is parsed and the number of requests the user has made within the last window is calculated
    const data = JSON.parse(record);
    const windowBeginTimestamp = moment().subtract(WINDOW_DURATION_IN_HOURS, 'hours').unix();
    const requestsInWindow = data.filter((entry: any) => {
      return entry.requestTimeStamp > windowBeginTimestamp;
    });
    const totalWindowRequestsCount = requestsInWindow.reduce(
      (accumulator: any, entry: any) => accumulator + entry.requestCount,
      0
    );

    const MAX_WINDOW_REQUEST_COUNT = getMaxRequestCount(req.user);

    // if maximum number of requests is exceeded then an error is returned
    if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
      res.status(CONSTANTS.STATUS.TOO_MANY_REQUESTS).json({
        message: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_DURATION_IN_HOURS} hrs limit!`,
      });
    } else {
      // When the number of requests made are less than the maximum the a new entry is logged
      const lastRequestLog = data[data.length - 1];
      const potentialCurrentWindowIntervalStartTimeStamp = currentTime
        .subtract(WINDOW_LOG_DURATION_IN_HOURS, 'hours')
        .unix();
      // When the interval has not passed from the last request, then the counter increments
      if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
        lastRequestLog.requestCount++;
        data[data.length - 1] = lastRequestLog;
      } else {
        // When the interval has passed, a new entry for current user and timestamp is logged
        data.push({
          requestTimeStamp: currentTime.unix(),
          requestCount: 1,
        });
      }
      redisClient.set(req.ip, JSON.stringify(data));
      req.data = data;
      console.log('data:', data);
      next();
    }
  } catch (error) {
    handleException('customLimiter', error, null, false);
  }
};
