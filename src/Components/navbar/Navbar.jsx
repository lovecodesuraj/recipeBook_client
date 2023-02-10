import React from 'react'
import { AppBar, Paper, Button, Container, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import useStyles from "./styles"
import SearchIcon from "@material-ui/icons/Search"
const Navbar = ({getRecipes}) => {
    var user=localStorage.getItem('profile');
    user=JSON.parse(user);
    const cuisineTypeARR = ["american", "asian", "british", "caribbean", "Central Europe", "Chinese", "French", "Indian", "Italian", "Japanese", "Middle Eastern", "South American", "South East Asian"]
    const APP_ID = "6e902b53";
    const APP_KEY = "35aed20a0a72b0dbfc63a4487b0471da";
    const [query, setQuery] = useState("");
    const [authButtonText,setAuthButtonText]=useState(user?"LOGOUT" : "SIGN IN");
    const [recipes, setRecipes] = useState([]);
    

    const handleAuth=()=>{
        if(user){
           localStorage.clear();
           setAuthButtonText("SIGN IN");
        }else{
          navigate("/auth");
          setAuthButtonText("LOGOUT")
        }
    }
    async function getRecipe() {
        let url = "";
        cuisineTypeARR.find(type => type === query) ?
            url = `https://api.edamam.com/api/recipes/v2?type=public&
        app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=${query}`
            : url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&
        app_id=${APP_ID}&app_key=${APP_KEY}`
            ;
        console.log(url);
        let output = await axios.get(url);
        setRecipes(output.data.hits);
        getRecipes(output.data.hits);
        // console.log(output.data);
    }

    function handleSubmit(e) {
        e.preventDefault();
        getRecipe();
        navigate("/");
    }
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <Container lg={12}  >
            <Paper fullWidth elevation={6} className={classes.navbar} >
                <Paper className={classes.paper}>
                    <Button className={classes.authButton} onClick={() => { navigate(`/`) }}  style={{margin:"0 20px 0 0"}}variant='outlined' color="primary" >Home</Button>
                    <TextField label="search" size="small" variant='outlined' value={query} onChange={(e) => { setQuery(e.target.value) }} />
                    <Button variant='contained' onClick={handleSubmit} className={classes.searchButton}><SearchIcon /></Button>
                    <Button className={classes.authButton} onClick={() => { navigate(`/users/${user.result._id}`) }} variant='outlined' color="primary" disabled={!user}>Saved</Button>
                    <Button className={classes.authButton} onClick={() => { handleAuth() }} variant='contained' color="primary" >{authButtonText}</Button>
                </Paper>
            </Paper>
        </Container>
    )
}

export default Navbar