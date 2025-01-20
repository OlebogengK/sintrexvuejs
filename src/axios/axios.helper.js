import axios from "axios";

class AxiosHelper {
    constructor(emitter){
        
    }
    get(path,params){
        return axios.get(path,params)
    }
    post(path,params){
        return axios.post(path,params)
    }
    put(path,params){
        return axios.put(path,params)
    }
    delete(path,params)
    {
        return axios.delete(path,{data:params})
    }
}

export default AxiosHelper