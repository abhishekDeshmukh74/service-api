import { Response } from 'express';

import { CONSTANTS } from '@constants';
import { handleException } from '../../config/error-handler';

class WeatherController {
  async getTodaysWeatherReport(req: Request | any, res: Response) {
    try {
      console.log('data:', req.data);
      res.status(CONSTANTS.STATUS.OK).json({
        data: 'some data',
      });
    } catch (e) {
      handleException('getTodaysWeatherReport', e, res);
    }
  }
}

export const weatherController = new WeatherController();
