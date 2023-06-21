//##RIZ: code all the account utils here.
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//one function should just be to create a timeout and call a logout function after the timer is up. 
//this function should take the timeout duration as an argument. 

const LogoutActions = () => {
    //Alvin's logout actions
    alert("Session expired"); 
    //navigate("/logout", { replace: true });
    console.log('User logged out');
  };
  

//##RIZ: would be good to declare the type of your argument explicitly. e.g. timeoutDuration:number
//already I see that the function call in App.tsx is passing in the wrong type of argument
//(line 70 on App.tsx)


// export const createLogoutTimeout = (timeoutDuration: number) => {
//     const timeout = setTimeout(LogoutActions, timeoutDuration);
//     //console.log("Timer started");
//       const clearLogoutTimeout = () => {
//     clearTimeout(timeout);
//   };
//   };


  

  const createLogoutTimeout = (expiryTime: number) => {
    const currentTime = dayjs().unix();
    const timeoutDuration = (expiryTime - currentTime) * 1000;
  
    const timeout = setTimeout(LogoutActions, timeoutDuration);
  
    const clearLogoutTimeout = () => {
      clearTimeout(timeout);
    };
  
    return clearLogoutTimeout;
  };
  
  export { createLogoutTimeout };
//another function should contain the logout actions, ie to:

// - set currentUser to null
// - clear local storage
// - optionally, you can display a modal or popup to inform the user that their session has expired and they have been logged out
//   (check out src/components/dialogModal.tsx component)
//   otherwise just use window.alert to display a message
// - navigate to the home page (use the useNavigate hook for this)
