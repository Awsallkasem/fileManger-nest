import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/file/";
const API_URL3 = "http://localhost:3000/api/user/";
const API_URL4 = "http://localhost:3000/api/user/";
const API_URL2 = "http://localhost:3001/api/file/";

class FileService {
  generateRandom(maxLimit = 2) {
    let rand = Math.random() * maxLimit;

    rand = Math.floor(rand); // 99

    return rand;
  }
  getFiles(id) {
    return axios.get("http://localhost:3000/api/admin/getFiles/", {
      headers: authHeader(),
    });
  }
 async showMyFiles(groupId) {
    return await axios
      .get(API_URL3 + "showMyBookedFile/" + groupId, {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFile(fileId) {
    if (this.generateRandom() === 0) {
      return axios.delete(API_URL + "deletFile/" + fileId, {
        headers: authHeader(),
      });
    } else {
      return axios.delete(API_URL2 + "deletFile/" + fileId, {
        headers: authHeader(),
      });
    }
  }
  getAllFilesInGroup(id) {
    if (this.generateRandom() === 0) {
      return axios
        .get(API_URL + "getFilesInGroup/" + id, {
          headers: authHeader(),
        })
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return axios
        .get(API_URL2 + "getFilesInGroup/" + id, {
          headers: authHeader(),
        })
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  deleteFileFromGroup(fileId) {
    if (this.generateRandom() === 0) {
      return axios
        .delete(API_URL + "deletFile/" + fileId, { headers: authHeader() })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          if (error.resposnse) {
            console.log(error);
          }
        });
    } else {
      return axios
        .delete(API_URL2 + "deletFile/" + fileId, { headers: authHeader() })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          if (error.resposnse) {
            console.log(error);
          }
        });
    }
  }
  lockFile(fileId) {
    if (this.generateRandom() === 0) {
      return axios.post(API_URL3 + "bookFile/" + fileId, null, {
        headers: authHeader(),
      });
    } else {
      return axios.post(API_URL4 + "bookFile/" + fileId, null, {
        headers: authHeader(),
      });
    }
  }
  bulkLockFile(fileIds) {
    if (this.generateRandom() === 0) {
      return axios.post(
        API_URL3 + "bookFiles",
        { fileId: fileIds },
        {
          headers: authHeader(),
        }
      );
    } else {
      return axios.post(
        API_URL4 + "bookFiles",
        { fileId: fileIds },
        {
          headers: authHeader(),
        }
      );
    }
  }

  unBulkLockFile(fileIds) {
    if (this.generateRandom() === 0) {
      return axios.post(
        API_URL3 + "unBookFiles",
        { fileId: fileIds },
        {
          headers: authHeader(),
        }
      );
    } else {
      return axios.post(
        API_URL4 + "unBookFiles",
        { fileId: fileIds },
        {
          headers: authHeader(),
        }
      );
    }
  }

  unlockFile(fileId) {
    if (this.generateRandom() === 0) {
      return axios.post(API_URL3 + "unBookFile/" + fileId, null, {
        headers: authHeader(),
      });
    } else {
      return axios.post(API_URL4 + "unBookFile/" + fileId, null, {
        headers: authHeader(),
      });
    }
  }
}
export default new FileService();
