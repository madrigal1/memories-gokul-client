import React,{useEffect,useState} from 'react'

import Posts from '../Posts/posts'
import Form from '../Form/form'

import {Grow,Container,Grid} from '@material-ui/core'

import {getPosts} from '../../actions/posts.js'

import {useDispatch} from 'react-redux'

import useStyles from './styles'

const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [currentId,setCurrentId] = useState(null);

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);
    return (
        <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItem="strech" spacing="3">
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
