import axios from "axios";

const NOTIFICATION_SERVICE_URL=process.env.NOTIFICATION_SERVICE_URL


export const getUserNotifications = async(req,res)=>{
    try{
        const response = await axios.get(`${NOTIFICATION_SERVICE_URL}/user/${req.params.userId}`);
        res.json(response.data);
    }catch(error) {
        console.error("Get notifications error:", error.message);

        res
          .status(error.response?.status || 500)
          .json(
            error.response?.data || {
              message: "Failed to fetch notifications",
            },
          );
    }
}

export const markNotificationAsRead = async(req,res)=>{
    try{
        const response = await axios.patch(`${NOTIFICATION_SERVICE_URL}/${req.params.id}/read`);
        res.json(response.data);
    }catch(error) {
      console.log(error);
    }
}

export const getUnreadNotificationCount = async(req,res)=>{
    try{
        const response = await axios.get(
          `${NOTIFICATION_SERVICE_URL}/user/${req.params.userId}/unread-count`,
        );
        res.json(response.data);
    }catch(error) {
         console.error("Unread count error:", error.message);

         res.status(error.response?.status || 500).json(
           error.response?.data || {
             message: "Failed to get unread count",
           },
         );
    }
}