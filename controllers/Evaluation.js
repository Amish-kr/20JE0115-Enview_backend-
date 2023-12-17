import Event_info from "../models/Event.js";
import Alert_info from "../models/Alert.js";

const getLastFiveMinutesEvents = async (current) => {
  try {
    const fiveMinutesAgo = new Date(current.timestamp - 300000);
    const lastFiveMinutesEvents = await Event_info.find({
      timestamp: { $gte: fiveMinutesAgo },
    });
    return lastFiveMinutesEvents;
  } catch (error) {
    console.error("Error fetching last five minutes events:", error);
    throw error;
  }
};

const getLatestAlert = async () => {
  try {
    const latestAlert = await Alert_info.findOne().sort({ timestamp: -1 });
    return latestAlert;
  } catch (error) {
    console.error("Error fetching latest alert:", error);
    throw error;
  }
};

export const evaluate = async (req) => {
  try {
    const current = new Event_info(req.body);
    await current.save();
    const events = await getLastFiveMinutesEvents(current);
    const latest = await getLatestAlert();
    // If there is no alert
    if (!latest) {
      const newAlert = new Alert_info({
        timestamp: current.timestamp,
        vehicle_id: current.vehicle_id,
        message: `This is the first alert just for calculating`,
      });
      await newAlert.save();
      console.log("New alert generated:", newAlert);
    }
    // If there is no alert last 5 minutes
    else if (current.timestamp - latest.timestamp >= 300000) {
      const newAlert = new Alert_info({
        timestamp: current.timestamp,
        is_driving_safe: false,
        vehicle_id: current.vehicle_id,
        message: `Everything is fine`,
      });
      await newAlert.save();
      console.log("New alert generated:", newAlert);
    }
    // If last alert was before 5 minutes
    else {
      let count = 0;
      const current_vehicle_id = current.vehicle_id;
      for (let i = 0; i < events.length; i++) {
        if (current_vehicle_id != events[i].vehicle_id) continue;
        if (
          events[i].is_overspeeding &&
          current.location_type === events[i].location_type
        ) {
          count++;
        }
      }

      let flag = false;

      if (current.location_type === "highway" && count >= 4) {
        flag = true;
      } else if (current.location_type === "city_center" && count >= 3) {
        flag = true;
      } else if (current.location_type === "commercial" && count >= 2) {
        flag = true;
      } else if (current.location_type === "residential" && count >= 1) {
        flag = true;
      }
      if (flag) {
        const newAlert = new Alert_info({
          timestamp: current.timestamp,
          is_driving_safe: false,
          vehicle_id: current.vehicle_id,
          message: `Hey person riding vehicle id as ${current.vehicle_id} decrease your speed in ${current.location_type}`,
        });
        await newAlert.save();
        console.log("New alert generated:", newAlert);
      } else {
        console.log("No new alert: Have fun ride!!!!!");
      }
    }

    console.log("End evaluate: Success");
  } catch (error) {
    console.error("Error in evaluate:", error);
    throw error;
  }
};
