import AnalyticsData from "./model/analyticsData.model.js";
import { data } from "./constants/data.js";
const defaultData = async () => {
    try {
        // await Product.deleteMany({})
        // await AnalyticsData.insertMany(data);
        console.log(`Data imported Successfully`)
    } catch (error) {
        console.log("Error while inserting default data")
    }
}

export default defaultData 