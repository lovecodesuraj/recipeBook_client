import React from 'react'
import {Paper }from '@material-ui/core'
import "../StyleSheets/ItemDescription.css"

export default function ItemDescription(props) {
const data = props.recipeItem;
// console.log(data);
const cuisineType = data.cuisineType.map(cuisine=>{
    return(
        <div className="types">
            <h3 style = {{textTransform:"capitalize"}}>{cuisine}</h3>
        </div>
    )}
)
const mealType = data.mealType.map(meal=>{
    return(
        <div className="types">
        <h3 style = {{textTransform:"capitalize"}}>{meal}</h3>
    </div> 
    )
})
const dishType = data.dishType.map(dish=>{
    return(
        <div className="types">
            <h3 style = {{textTransform:"capitalize"}}>{dish}</h3>
        </div>
    )
})
const ingredients = data.ingredients.map((ingredient)=>{
    return<>

        <Paper className = "ingredient" >
            <p><strong>Ingredient</strong> : {ingredient.food}</p>
            <p><strong>Ingredient description</strong> : {ingredient.text}</p>
        </Paper>
    </>

})

  return (
    <div className='itemDescription'>
        <h1 className='RecipeName'>{data.label}</h1>
        <img src={data.image} alt="" />
        <div className="cuisines">
            <h3>Cuisine Type:</h3>
            {cuisineType}
        </div>
        <div className="meal">
            <h3>Meal Type:</h3>
            {mealType}
        </div>
        <div className="dish">
            <h3>Dish Type:</h3>
            {dishType}
        </div>
        <div className="ingredients">
            <h2>Ingredients</h2>
            {ingredients}


        </div>
    </div>
  )
}