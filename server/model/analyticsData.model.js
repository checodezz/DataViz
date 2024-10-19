import mongoose from "mongoose";

const AnalyticsDataSchema = new mongoose.Schema({
  Day: String,
  Age: String,
  Gender: String,
  A: String,
  B: String,
  C: String,
  D: String,
  E: String,
  F: String,   
  });

  const AnalyticsData = mongoose.model('AnalyticsData', AnalyticsDataSchema);

  export default AnalyticsData