import React, { useEffect } from "react";
import Axios from "axios";

import { useState } from "react";

import "../StyleSheets/front-page.css"
import {APP_ID, APP_KEY} from "./key";
import RecipeCard from "./RecipeCard";

export default function StartPage({recipes,getRecipeItem}){
    const cuisineTypeARR = ["american","asian","british","caribbean","Central Europe","Chinese","French",
                            "Indian","Italian","Japanese","Middle Eastern","South American","South East Asian"] 

    const [query,setQuery] = useState({
        query:"",
        cuisineType:""
    });
    // const [recipes,setRecipes] = useState([]);

    async function getRecipe(){
        let url="";
        cuisineTypeARR.find(type=>type===query.query)?
         url = `https://api.edamam.com/api/recipes/v2?type=public&
        app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=${query.query}`
        : url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query.query}&
        app_id=${APP_ID}&app_key=${APP_KEY}`
        ;
        console.log(url);
        let output = await Axios.get(url);
        // console.log(output.data);
    }

    
    useEffect(()=>{
        getRecipe();
    },
    [])

    return (
        <div className="front-page">
            <h1>Geniobits Recipe Book 🍕</h1>
               
            <div className="recipeCards">
                {/* {recipes.map((recipe,index)=>{return <RecipeCard key = {index} recipe = {recipe} index={index} getItem = {props.getRecipeItem}/> })} */}
                {recipes.map((recipe)=>{return <RecipeCard key={recipe.recipe.image} recipe = {recipe} getRecipeItem = {getRecipeItem}/>})}
            </div>
        </div>
    )
}