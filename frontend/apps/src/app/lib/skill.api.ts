const SERVICE_URL = process.env.SERVICE_URL;
import { authFetch } from "./authFetch";
export const getAllSkills = async(authUserId:string,token:string,flag:boolean)=>{
    const data = await authFetch(
      `http://localhost:4000/skills/user/${authUserId}`,
      {
        method: "GET",
      },
    );
    // const data = await res.json();
    if(flag)return data.skills.filter((s:any)=>s.type === "OFFERED")
    return data.skills.filter((s:any)=>s.type === "WANTED")
}
export const createSkill = async(data:any,token:string)=>{
    return  await authFetch(`http://localhost:4000/skills/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    // return res.json();
}
export const deleteSkill = async(id:string,token:string)=>{
    return await authFetch(`http://localhost:4000/skills/${id}`, {
      method: "DELETE",
    });
}

export const getMatches = async(token:string)=>{
   const data = await authFetch("http://localhost:4000/skills/matches", {
      method: "GET",
    });
    // if(!res.ok)throw new Error("Failed to fetch matches ")
    //     return res.json();
    return data;
}

export const getSkill = async(id:string,token:string)=>{
  return await authFetch(`http://localhost:4000/skills/getSkill/${id}`);
}

export const searchSkills = async(query:string,token:string)=>{
  const data = await authFetch(`http://localhost:4000/skills/search?query=${query}`, {
    method: "GET",
  });
  return data;
} 