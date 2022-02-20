import express from "express";

export const wrap = (asyncFn: Function) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500);
      res.send({ error: "exception_occurred" });
    }
  };
};
