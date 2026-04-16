import { authFetch } from "./authFetch";
const SERVICE_URL =
  process.env.SERVICE_URL || "https://api-gateway-wkss.onrender.com";
export const createSwap = async(id:string,offeredSkillId:string,wantedSkillId:string,message:string)=>{
    const dataObj = {
        receiverUserId:id,
        offeredSkillId,
        wantedSkillId,
        message
    }
    return await authFetch(`${SERVICE_URL}/swaps`, {
      method: "POST",
      body: JSON.stringify(dataObj),
    });
}

export const getAllSwaps = async(userId:string)=> {
    return await authFetch(`${SERVICE_URL}/swaps/user/${userId}`);
}
export const getAllSwapsData = async(userId:string)=>{
    return await authFetch(`${SERVICE_URL}/swaps/user/${userId}/all`);
}
export const updateSwapStatus = async(id:string,status:string,token:string)=>{
    return await authFetch(`${SERVICE_URL}/swaps/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
}