import { authFetch } from "./authFetch";

export const getNotification = async(userId:string)=>{
    return await authFetch(
      `http://localhost:4000/notification/user/${userId}`,
    );
    // notification
}

 export const setRead = async(id:string)=>{
    return await authFetch(`http://localhost:4000/notification/${id}/read`,{
        method:"PATCH"
    });

}