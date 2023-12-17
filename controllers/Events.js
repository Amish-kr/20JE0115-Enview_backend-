import { evaluate } from "./Evaluation.js";

export const Event = async (req, res) => {
  try {
    await evaluate(req);
    res.status(200).send("Event received successfully");
  } catch (error) {
    res.status(500).send("Error saving event");
  }
};
