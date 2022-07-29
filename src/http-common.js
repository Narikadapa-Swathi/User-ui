import axios from 'axios';
export default axios.create({

    baseURL: 'http://localhost:9005/user',
    headers:{
        'content-type':'application/json'
    }
})