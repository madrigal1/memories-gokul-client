import React,{useEffect} from 'react'
import {Container,AppBar,Typography,Row,Grid,Grow} from '@material-ui/core'
import memories from './images/memories.png'

import Posts from './components/Posts/posts'
import Form from './components/Form/form.js'

import useStyles from './styles.js'
import {useState} from 'react'
import {useDispatch} from 'react-redux'

import {getPosts} from './actions/posts.js'

import  './index.css'

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(null);

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} vairant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
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
        </Container>
    )
}

export default App
