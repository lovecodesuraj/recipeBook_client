import React, { useState } from 'react'
import "../StyleSheets/RecipeCard.css"
import { useNavigate } from 'react-router-dom'
import SaveIcon from "@material-ui/icons/BookmarkBorder";
import { Button } from '@material-ui/core';
import axios from 'axios';
import SaveIconFilled from "@material-ui/icons/Bookmark"
// export default function RecipeCard({recipe,index}) {
  const user=localStorage.getItem('profile');
  const dataa=JSON.parse(user);
  // console.log(data);
  export default function RecipeCard(props){
    const [saved,setSaved]=useState(false);
  const navigate = useNavigate();
  const data = props.recipe.recipe;
  async function handleClick(){
    await props.getRecipeItem(data);
    navigate("/recipeDescription");
  }

  const saveRecipe=async(recipe)=>{
    try {
      const url=`https://recipebook-server.onrender.com/users/saveRecipe/${dataa.result._id}`
      console.log(url);
         const response=await  axios.post(url,recipe);
         setSaved(true);
        //  console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    // <div className='recipeCard' onClick={navigate(`/recipes/${index}`)}>
    <div className='recipeCard' >
        <img className='recipeCardImage'onClick={handleClick} src={props.recipe.recipe.image}/>
        <p className='recipeCardName'> {props.recipe.recipe.label}</p>
        <Button variant='outlined' size="small" onClick={()=>{ saveRecipe(props.recipe.recipe) }}> {!saved?<SaveIcon />:<SaveIconFilled />}</Button> 

        {/* <SaveIcon/> */}
    </div>
  )
  }