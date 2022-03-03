import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.error(error);
  res.status(500).end();
};

export default errorHandler;