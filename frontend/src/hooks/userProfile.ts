import useCookie from "./cookie/useCookie"
import { useDispatch } from "react-redux";
const userProfile = ()=> {
    const {getCookie} = useCookie();
    const dispatch = useDispatch();
    const token = getCookie('token');

    if (!token) {
        console.error("Token is not available");
        return null;
      }

    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));

    console.log(payload,"payload")

    return payload.user;

}

export default userProfile;