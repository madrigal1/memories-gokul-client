import React,{useState,useEffect} from 'react'
import makeStyles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch,useSelector,} from 'react-redux'

import {createPost,updatePost} from '../../actions/posts.js'


const Form = ({currentId,setCurrentId}) => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const post = useSelector((state)=>currentId?state.posts.find((p)=>p._id === currentId):null);
    const [postData,setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log("post form data " +user)

    useEffect(()=>{
        if(post) setPostData(post);
    },[post]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("post form " + postData);
        if(currentId)
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
        else
            dispatch(createPost({...postData,name:user?.result?.name}));
        clear();
    }

    const clear = ()=>{
        setCurrentId(null);
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to create your own memories and see other memories
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e)=>handleSubmit(e)}>
                <Typography variant="h6">{currentId?"Editing":"Creating"} a Memory</Typography>
                <TextField name="title" vairant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})} />
                <TextField name="message" vairant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})} />
                <TextField name="tags" vairant="outlined" label="Tags(comma-seprated)" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})} />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        mutiple={false}
                        onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form