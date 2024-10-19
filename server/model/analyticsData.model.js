import mongoose from "mongoose";

const AnalyticsDataSchema = new mongoose.Schema({
    day: String,     
    age: String,     
    gender: String, 
    a: Number,     
    b: Number,
    c: Number,       
    d: Number,       
    e: Number,       
    f: Number    
  });

  const AnalyticsData = mongoose.model('AnalyticsData', AnalyticsDataSchema);

  export default AnalyticsData