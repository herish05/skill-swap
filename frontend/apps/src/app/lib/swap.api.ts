import { authFetch } from "./authFetch";

export const createSwap = async(id:string,offeredSkillId:string,wantedSkillId:string,message:string)=>{
    const dataObj = {
        receiverUserId:id,
        offeredSkillId,
        wantedSkillId,
        message
    }
    return await authFetch(`http://localhost:4000/swaps`,{
        method:"POST",
        body:JSON.stringify(dataObj)
    });
}

export const getAllSwaps = async(userId:string)=> {
    return await authFetch(`http://localhost:4000/swaps/user/${userId}`);
}

export const updateSwapStatus = async(id:string,status:string,token:string)=>{
    return await authFetch(`http://localhost:4000/swaps/${id}/status`,{
        method:"PATCH",
        body:JSON.stringify({status})
    });
}