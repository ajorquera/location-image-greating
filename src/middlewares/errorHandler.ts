import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {

  console.log(error);

  next(error);
};

export default errorHandler;