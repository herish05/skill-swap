"use client"
import { createContext,useContext,useEffect,useState } from "react"

import { getUserFromToken } from "@/app/lib/auth"
import { getProfile } from "@/app/lib/profile.api"

const UserContext  = createContext<any>(null);
export const UserProvider=({children}:{children:React.ReactNode})=>{
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const loadUser = async()=>{
            const auth = getUserFromToken();
            if(!auth){
                setLoading(false);
                return;
            }
            try{
                const profileData = await getProfile(auth.authUserId,auth.token);
                setUser(profileData.profile);
            }catch(err) {
                console.log(err);

            }finally{
                setLoading(false);
            }
        }
        loadUser();
    },[]);
    return (
        <UserContext.Provider value={{user,loading}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = ()=>useContext(UserContext);