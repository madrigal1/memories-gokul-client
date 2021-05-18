
import * as api from '../api';
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE} from '../constants/actionTypes';


//Action creators

export const getPosts = ()=> async (dispatch)=> {
    try {
        const {data} = await api.fetchPosts();
        console.log(`apidata: ${data.length}`)
        dispatch({type:FETCH_ALL,payload: data});

    }catch(err){
        console.log(err.messsage);
    }
}

export const createPost = (post)=>async (dispatch)=>{
    try {
        const {data} = await api.createPost(post);

        dispatch({type:CREATE,payload:data});
    }catch(err) {
        console.log(err);
    }
}

export const updatePost = (id,post)=> async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data})
    }catch(err) {
        console.log(err);
    }
}

export const deletePost = (id)=> async (dispatch)=>{
    console.log("id" + id);
    try {
          await api.deletePost(id);
          dispatch({type:DELETE,payload:id})
    }catch(err){
        console.log(err);
    }
}

export const likePost = (id) => async (dispatch)=>{
    try {
        const {data} = await api.likePost(id);
        dispatch({type:LIKE,payload:data});
    }catch(err) {
        console.log(err);
    }
}

