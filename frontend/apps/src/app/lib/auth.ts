
import {jwtDecode} from "jwt-decode"
export const isAuthenticated = ()=>{
    if(typeof window === "undefined")return false;
    return !!localStorage.getItem("token");
}

export const getUserFromToken = ()=>{
    const token = localStorage.getItem("token");
    if(!token)return null;
    const pureToken = token.startsWith("Bearer ")?token.split(" ")[1]:token;
    if(pureToken.split(".").length !== 3) {
        console.log("Invalid token format");
        localStorage.clear();
        return null;
    }

    const decoded:any = jwtDecode(token);
    // console.log("decoded " + decoded )
    return {
      token:pureToken,
      authUserId: decoded.userId,
      email: decoded.email,
    };
}
export const getToken = ()=>localStorage.getItem("token");
