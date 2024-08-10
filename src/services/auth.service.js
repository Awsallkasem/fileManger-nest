import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
 async login(email, password) {
    return await axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.user.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.user.user));
          localStorage.setItem("token", JSON.stringify(response.data.user.accessToken));
          localStorage.setItem("userId", JSON.stringify(response.data.user.user.id));
        }
        return response;
      }).catch((error)=>{
        if (error.response) {
          return error.response; } 
        return error;
  
      });
 
    }

  logout() {
    localStorage.removeItem("user");
  }

 async register(Fname, Lname, email, password) {
    const user = {
      Fname,
      Lname,
      email,
      password,
    };
    
   return await axios.post(API_URL + "register", { user }).then((response)=>{
      return response;
    }).catch((error)=>{
      if (error.response) {
        return error.response; } 
      return error;

    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
