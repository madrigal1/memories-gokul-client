import React from 'react'
import Post from './Post/post.js'

import {useSelector} from 'react-redux'
import makeStyles from './styles'

import {Grid,CircularProgress} from '@material-ui/core'

const Posts = ({setCurrentId}) => {
    const classes = makeStyles();
    const posts = useSelector((state)=>state.posts);

    console.log(posts);
    return (
        !posts.length?<CircularProgress/>:(
            <Grid className={classes.container} container alignItem="strech" spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
