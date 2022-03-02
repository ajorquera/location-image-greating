import { RequestHandler } from "express";

const helloWorld: RequestHandler = (_req, res) => {
  res.json({
    message: "Hello World"
  });
};

export default helloWorld;