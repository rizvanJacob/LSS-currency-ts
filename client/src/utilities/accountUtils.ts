//##RIZ: code all the account utils here.
import dayjs from "dayjs";
//import { useEffect } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


//one function should just be to create a timeout and call a logout function after the timer is up. 
//this function should take the timeout duration as an argument. 



// function LogoutActions() {
//   //const navigate = useNavigate();

//   useEffect(() => {
//      alert("Session expired"); 
//      //navigate("/Logout");
//   }, []);
// }

const LogoutActions = () => {
    alert("Session expired"); 
    localStorage.clear();
    console.log('User logged out');
    
    //Alvin's logout actions
    //const navigate = useNavigate();
    //navigate("/logout", { replace: true });
  };
  

//##RIZ: would be good to declare the type of your argument explicitly. e.g. timeoutDuration:number
//already I see that the function call in App.tsx is passing in the wrong type of argument
//(line 70 on App.tsx)

  
  //##RIZ: suggest you accept the expiry time argument as a date or a dayjs object. 
  const createLogoutTimeout = (expiryTime: number) => {
    const currentTime = dayjs().unix();
    //##RIZ: suggest you use dayjs to manipulate things to do with time. 
    const timeoutDuration = (expiryTime - currentTime) * 1000;
  
    const timeout = setTimeout(LogoutActions, timeoutDuration);
  
    //##RIZ: Good job returning the cleared timeout. 
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
