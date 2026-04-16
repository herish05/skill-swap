import { authFetch } from "./authFetch";

export const getNotification = async(userId:string)=>{
    return await authFetch(
      `https://api-gateway-wkss.onrender.com/notification/user/${userId}`,
    );
    // notification
}

 export const setRead = async(id:string)=>{
    return await authFetch(
      `https://api-gateway-wkss.onrender.com/notification/${id}/read`,
      {
        method: "PATCH",
      },
    );

}