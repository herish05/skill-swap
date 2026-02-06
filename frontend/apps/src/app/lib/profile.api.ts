const SERVICE_URL = process.env.SERVICE_URL
export const getProfile = async(authUserId:string,token:string)=>{
    try{
        const res = await fetch(
          `http://localhost:4000/users/profile/${authUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed");
        return await res.json();
    }catch(err) {
        console.log(err);
        return null;
    }
}

export const createProfile = async(data:any,token:string) =>{
    const res = await fetch("http://localhost:4000/users/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
      body:JSON.stringify(data)
    });
    return res.json();
}
export const updateProfile = async(authUserId:string,data:any,token:string)=>{
    const res = await fetch(`http://localhost:4000/users/profile/${authUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(data)
    });
    return res.json();
}