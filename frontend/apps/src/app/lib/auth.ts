
import {jwtDecode} from "jwt-decode"
export const isAuthenticated = ()=>{
    if(typeof window === "undefined")return false;
    return !!localStorage.getItem("token");
}

export const getUserFromToken = ()=>{
    const token = localStorage.getItem("token");
    if(!token)return null;
    const decoded:any = jwtDecode(token);
    // console.log("decoded " + decoded )
    return {
      token,
      authUserId: decoded.userId,
      email: decoded.email,
    };
}
export const getToken = ()=>localStorage.getItem("token");
