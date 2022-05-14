import { Router } from "express";
import { pingHandler } from "./handlers/ping-handler";

export const router = Router();

router.get("/ping", pingHandler);
