import React,{useEffect} from 'react'
import {Container,Grid,Grow} from '@material-ui/core'




import useStyles from './components/Home/styles.js'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


import  './index.css'
import Navbar from './components/Navbar/navbar'
import Home from './components/Home/home.js'
import Auth from './components/Auth/Auth.js'

const App = () => {
   
   
    return (
        <Router>
            <Navbar/>
            <Container maxWidth="lg">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/auth" component={Auth}/>
                </Switch>
            </Container>
        </Router>
    )
}

export default App
