import axios from axios;

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const fetchData = async(endpoint) =>{
    try{
        const response = await API.get(endpoint);
        return response.data;
    }
    catch(error){
        console.error("error fetching data: ",error);
        throw error;
    }
}

export const postData = async(endpoint, data) =>{
    try{
        const response = await API.post(endpoint, data);
        return response.data;
    }
    catch(error){
        console.error("error posting data: ",error);
        throw error;
    }
}

export const updateData = async(endpoint, data) =>{
    try{
        const response = await API.put(endpoint, data);
        return response.data;
    }
    catch(error){
        console.error("error updating data: ",error);
        throw error;
    }
}

export const deleteData = async(endpoint, data) =>{
    try{
        const response = await API.delete(endpoint, data);
        return response.data;
    }
    catch(error){
        console.error("error deleting data: ",error);
        throw error;
    }
}