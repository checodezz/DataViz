import AnalyticsData from "../model/analyticsData.model.js"

export const getAnalyticsData = async (req, res) => {
    try {
        const data = await AnalyticsData.find();
        if(data){
           return res.status(200).json({message: "data fetched sucessfully", data})
        } else {
           return res.status(404).json({message: "No data found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}