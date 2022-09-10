import express, {Express as Application} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import celebrate from "celebrate";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import config from '../config';
import routes from '../../controllers';
import {StaticController} from "../infra/baseController";

export default (app: Application) => {

  // Health Check endpoints
  app.get('/status', (req, res) => res.status(200).end());
  app.head('/status', (req, res) => res.status(200).end());

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc.)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  app.use(express.static('public'));

  app.use(cookieParser());

  // Load API controllers
  app.use(config.api.prefix, routes());

  // Middleware for API request validation
  app.use(celebrate.errors());

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {swaggerOptions: {url: "/swagger.json"}}));

  // must be the last path defined
  app.get('*', (req, res) => StaticController.notFound(res, `Route not found: ${req.url}`));

};
