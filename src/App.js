import React, { useEffect } from "react";
import { useState } from "react";
import StartPage from "./Components/StartPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Auth from "./Components/auth/Auth";
import ItemDescription from "./Components/ItemDescription";
import Navbar from "./Components/navbar/Navbar";
import { CircularProgress, Container } from "@material-ui/core";
import Axios from "axios";
import {Paper} from "@material-ui/core"
import useStyles from "./styles.js";
import axios from "axios";
import Saved from "./Components/saved/saved";
const APP_ID = "6e902b53";
const APP_KEY = "35aed20a0a72b0dbfc63a4487b0471da";
// const user=localStorage.getItem('profile');
function App() {
  // console.log(user);
  const classes=useStyles();
  const [recipes,setRecipes]=useState([]);
  const [recipeItem,setRecipeItem] = useState({});
  function getRecipes(data){
      setRecipes(data);
      // console.log(data);
  }
  function getRecipeItem(object){
    setRecipeItem(object);
  }
  useEffect(()=>{
    const getDefaults=async()=>{
      let output = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=indian&
      app_id=${APP_ID}&app_key=${APP_KEY}`);
      // console.log(output);
      setRecipes(output.data.hits);
    }
    getDefaults();

  },[])
  return (
    <div>
        <Navbar getRecipes = {getRecipes}/>
        <Container className="routes">
        <Routes>
          <Route exact path="/" element = {recipes.length?<StartPage recipes= {recipes} getRecipeItem={getRecipeItem}/>:<Paper className={classes.progress}><CircularProgress /></Paper>}/>
          <Route exact path="/auth" element = {<Auth />}/>
          <Route exact path="/users/:id" element = {<Saved />}/>
          <Route exact path="/recipeDescription" element = {<ItemDescription recipeItem={recipeItem} />}/>
          <Route exact path = "/recipe/:index" element = {<ItemDescription recipeItem = {recipeItem}/>} />
        </Routes>
        </Container>

    </div>
  );
}

export default App;
