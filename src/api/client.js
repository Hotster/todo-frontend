import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;


export const client = axios.create({
    baseURL: "http://192.168.0.111:8000/api"
})
