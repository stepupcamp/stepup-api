import "express-async-errors";
import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import celebrate from "celebrate";
import cls from "../plugins/cls";
import routes from "../routes";
import requestErrorHandler from "../middlewares/requestErrorHandler";
import HttpException from "../exceptions/HttpException";

export default ({ app }: { app: Application }) => {
  /**
   * Health Check endpoints
   */
  app.get("/status", (_req, res) => {
    res.status(200).end();
  });
  app.head("/status", (_req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({ credentials: false }));
  // "Lets the app use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  app.use(require("method-override")());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Helps set request scoped properties or methods.
  // Every request has it's own scoped preventing cross request population of values.
  app.use(cls.middleware);

  // Load all the routes
  app.use(routes);

  /// catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new HttpException(404, "Not found.");
    next(err);
  });

  // enables Celebrate's validation error handling.
  app.use(celebrate.errors());

  /*
   * Triggered by the package "express-async-errors"
   * whenever, ANY exception occurs while handling the request.
   */
  app.use(requestErrorHandler);
};
