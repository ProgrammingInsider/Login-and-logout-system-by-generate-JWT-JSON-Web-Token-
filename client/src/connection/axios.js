import axios from 'axios';

export const signupDB = async(sentData) => {
    const resp = await axios.post("http://localhost:5000/send",sentData)
    const {value,msg} = resp.data

    return {value,msg}
}

export const signinDB = async(sentData) => {
    const resp = await axios.post("http://localhost:5000/signin",sentData);

    const {value,msg} = resp.data

    if(value!== null){
       localStorage.setItem('token',value);   
    }
    
    return {value,msg}
}

