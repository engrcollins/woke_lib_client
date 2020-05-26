import axios from "axios";
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: "https://woke-lib-server.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
});

/*axios.defaults.withCredentials = true;
 axios.get('http://localhost:8080/getDetails',{
           headers:{
                    withCredentials:true,

                   }
  });*/