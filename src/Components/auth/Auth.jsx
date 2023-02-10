import React, { useState } from "react";
import { Typography, Paper, Button, Avatar, Grid, Container, TextField } from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from "./input"
import axios from "axios";
// const user=JSON.parse(localStorage.getItem('profile'));
const initialState={firstName:"",lastName:"",email:"",password:"",confirmPassword:""};
const Auth = () => {    
    const [formData,setFormData]=useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const classes = useStyles();
    const navigate=useNavigate();
    // const isSignup = true;
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {     
            if(isSignup){
                const {data}=await axios.post("https://recipebook-server.onrender.com/users/signup",formData);
                console.log(data);
                localStorage.setItem("profile",JSON.stringify(data));
                navigate("/");
            }else{
                const {data}=await axios.post("https://recipebook-server.onrender.com/users/signin",formData);
                localStorage.setItem("profile",JSON.stringify(data));
                // console.log()
                navigate("/");
            }
        } catch (error) {
            console.log(error.message);        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
     }

    const swicthMode = () => {
        setIsSignUp(prev => !prev);
        setShowPassword(false);
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    return (
        <>
            <Container component='main' maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" value={formData.firstName} handleChange={handleChange} half />
                                        <Input name="lastName" label="Last Name" value={formData.lastName} handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" value={formData.email} handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" vaule={formData.password} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" color="primary" variant="contained" fullWidth className={classes.submit}>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Button   variant="contained" fullWidth className={classes.googleButton}>
                        </Button>


                        <Grid container justifyContent="flex-end" >
                            <Grid item >
                                <Button onClick={swicthMode}>
                                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Auth




// {error: 'idpiframe_initialization_failed', details: 'You have created a new client application that use…i/web/guides/gis-migration) for more information.'}