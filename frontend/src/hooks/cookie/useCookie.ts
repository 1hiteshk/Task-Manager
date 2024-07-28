const useCookie = () => {
  const isBrowser = typeof document !== 'undefined';

    const getCookie = (tokenName: string) => {
      if (!isBrowser) return "";
    
        var name = tokenName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(";");
      
        for (var i = 0; i < cookieArray.length; i++) {
          var cookie = cookieArray[i].trim();
          if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
          }
        }
        return "";
      };
      
      const setAuthCookie = (tokenName: string, token: string) => {
        let parts = token.split(".");
      
        // let header = JSON.parse(atob(parts[0]));
        let payload = JSON.parse(atob(parts[1]));
        // let signature = parts[2];
       console.log(payload)
     
        let expiresIn = payload.exp;
        console.log(new Date().getTime().toLocaleString)
      
        let expiryTime = new Date().getTime() + expiresIn*1000;
        let expirationDate = new Date(expiresIn*1000);
       
      
      
        // console.log("Expires:", expiryDate.toUTCString());
        document.cookie = `${tokenName}=${token}; expires=${expirationDate.toUTCString()}; path=/`;
      
        // console.log("Header:", header);
        // console.log("Payload:", payload);
        // console.log("Signature:", signature);
      };
      
      const removeCookie = (tokenName: string) => {
        document.cookie = `${tokenName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      };


      const setCookie = (name: string, value: string) => {
        document.cookie =  name + "=" + value + ";"  + "path=" + "/";
      }

    return { getCookie, setAuthCookie, removeCookie, setCookie }
      
}

export default useCookie;