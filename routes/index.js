import express from "express";
import { Event } from "../controllers/Events.js";
import { Alert } from "../controllers/Alerts.js";
const router = express.Router();

router.post("/event", Event);
router.get("/alert/:alert_id", Alert);

export default router;
