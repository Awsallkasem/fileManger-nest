import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/admin/";
const API_URL1 = "http://localhost:3000/api/user/";

class GroupService {
 async getGroups() {
  
    return (await axios.get(API_URL + "showGroups", { headers: authHeader() })).data;
  }
  async getUserGroups() {
  
    return (await axios.get(API_URL1 + "showGroups", { headers: authHeader() })).data;
  }
  deleteGroup(id) {
    return axios.delete(API_URL + "deleteGroup/" + id, {
      headers: authHeader(),
    });
  }
  addUserToGroup(userId, groupId) {
    return axios.post(
      API_URL + "addUserToGroup/" + userId ,
      {groupId},
      { headers: authHeader() }
    );
  }
  addFileToGroup(fileId, groupId) {
    
    return axios.post(API_URL + "addFile/" + fileId + "/" + groupId, null, {
      headers: authHeader(),
    });
  }
   async getAllUsersInGroup(groupId) {
    return await axios.get(API_URL + "showUsersinGroup/" + groupId, {
      headers: authHeader(),
    }).then((response)=>{
      return response.data.data;
    }).catch((error)=>{
      if (error.response) {
        return error.response; } 
      return error;

    });
  }
 async deleteUserFromGroup(userId, groupId) {
    console.log(authHeader());
    return await axios.post(
      API_URL + "removeUserFromGroup/" + userId ,
      { groupId },
      { headers: authHeader() },
     
    );
  }
  createGroup(name) {

    const group={
       name
    }
    return axios.post(
      API_URL + "addGroup/",
      { group },
      { headers: authHeader() },
    );
  }
}
export default new GroupService();
