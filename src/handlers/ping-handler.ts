import type { Handler } from "express";

export const pingHandler: Handler = (req, res) => {
  res.json({ requestIp: req.ip });
};
