import React,{useState} from 'react'

import {Avatar, Button,Paper,Grid,Typography,Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'

import GoogleLogin from 'react-google-login'
import Icon from './icon'

import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {AUTH} from '../../constants/actionTypes'

import {signup,signin} from '../../actions/auth'

const initalState = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
};

const Auth = () => {
    const classes = useStyles();
    const[showPassword,setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false)
    const [formData,setFormData] = useState(initalState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        if(isSignup) {
            dispatch(signup(formData,history));
        }else {
            dispatch(signin(formData,history));
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const switchMode = ()=>{
        setIsSignup((prev)=>!prev);
        setShowPassword(false);
    }

    const googleSuccess = async (res)=>{
        try {
            const result = res?.profileObj;
            const token =  res?.tokenId;
            dispatch({type:AUTH,data:{result,token}})
            history.push('/');
        }catch(err) {
            console.log(err);
        }
    }

    const googleFailure =(err)=>{
        console.log(`Google sign in was a failure . Try again later: ${err}`)
    }

    const handleShowPassword = () => setShowPassword((prev)=> !prev);
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography vairant="h5" >{isSignup?"Sign up":"Sign in"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half pInput/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                        )}
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />}                   
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup?"Sign up":"Sign in"}
                    </Button>
                    <GoogleLogin
                        clientId="591545919977-vh5v2i8k4c6saiapd91t7fnh4tp891k6.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup? 'Already have a account? Sign in':"Don't have a account ? Sign up"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
 
export default Auth
