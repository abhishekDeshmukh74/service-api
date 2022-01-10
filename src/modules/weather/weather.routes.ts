import { Router, Request, Response } from 'express';

import { ensureAuthenticated } from '../../config/middlewares/ensure-authenticated.middleware';
import { weatherController } from './weather.controller';

class WeatherRoutes {

  private router: Router = Router();

  get routes() {

    this.router.post(
      '/today',
      ensureAuthenticated,
      (req: Request, res: Response) => {
        weatherController.getTodaysWeatherReport(req, res);
      },
    );

    return this.router;

  }

}

export const weatherRoutes = new WeatherRoutes();
