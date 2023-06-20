import LogoutCallback from "./components/LogoutCallback";
import jwtDecode from 'jwt-decode';

const checkLoginExpiry = () => {
    // Retrieve the login expiry information from your session or authentication storage
    // const loginExpiry = localStorage.getItem('token');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZGlzcGxheU5hbWUiOiJOaW1hbGFuIFRlc3QiLCJhdXRoQ2F0ZWdvcnkiOm51bGwsImFjY291bnRUeXBlIjo0LCJhcHByb3ZlZCI6dHJ1ZSwidHJhaW5lZSI6bnVsbCwiaWF0IjoxNjg2OTE3OTMyLCJleHAiOjE2ODY5MjE1MzJ9.6X-TPB3V1gQ4_zcOWZGNYLhco87wLqEHXL4HGIOi9hU'; // Replace with your actual JWT token


    try {
      const decodedToken = jwtDecode(token);
      const expiryDate = new Date(decodedToken.exp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    
      console.log('Token Expiry Date:', expiryDate);
    } catch (error) {
      console.error('Invalid JWT token');
    }

    console.log(expiryDate);
    const currentTime = Date.now();
  
    // Check if the session has expired
    if (expiryDate && currentTime > parseInt(expiryDate, 10)) {
      // Perform actions for expired session, such as redirecting to login page
      // or displaying a notification to the user
      
      // Redirect the user to the login page
      LogoutCallback();
      return ('Session expired')
    } else {
      // Perform actions for active session
      return ('Session active');
    }
  };

  export default checkLoginExpiry;