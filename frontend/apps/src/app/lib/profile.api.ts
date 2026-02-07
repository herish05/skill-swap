const SERVICE_URL = process.env.SERVICE_URL
import { authFetch } from "./authFetch";
export const getProfile = async(authUserId:string,token:string)=>{
    try{
        return  await authFetch(
          `http://localhost:4000/users/profile/${authUserId}`,
          
        );
       
    }catch(err) {
        console.log(err);
        return null;
    }
}

export const createProfile = async(data:any,token:string) =>{
    return await authFetch("http://localhost:4000/users/profile", {
      method: "POST",
      body: JSON.stringify(data),
    });
   
}
export const updateProfile = async(authUserId:string,data:any,token:string)=>{
    return  await authFetch(
      `http://localhost:4000/users/profile/${authUserId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );
    
}