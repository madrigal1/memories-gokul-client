import axios from 'axios'


//const url =  'https://memories-gokul.herokuapp.com/posts';

const API = axios.create({baseURL:'http://localhost:5000'});


API.interceptors.request.use((req)=>{
    const profile = JSON.parse(localStorage.getItem('profile'));
    if(profile?.token){
        req.headers.authorization = `Bearer ${profile.token}`
    }
    return req;
});

export const fetchPosts = ()=> API.get(`/posts`);
export const createPost = (newPost) => API.post(`/posts`,newPost);
export const updatePost = (id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost);
export const deletePost = (id)=>  API.delete(`/posts/${id}`);
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`)


export const signIn = (formData)=> API.post(`/user/signin`,formData);
export const signUp = (formData)=>API.post(`/user/signup`,formData);