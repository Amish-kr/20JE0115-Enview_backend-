import Alert_info from "../models/Alert.js";

export const Alert = async (req, res) => {
  try {
    const alert = await Alert_info.findOne({ _id: req.params.alert_id });
    if (alert) {
      res.status(200).json(alert);
    } else {
      res.status(404).json("Alert not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching alert");
  }
};
