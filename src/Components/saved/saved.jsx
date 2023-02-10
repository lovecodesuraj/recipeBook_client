import { CircularProgress, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Paper } from "@material-ui/core"
import "./styles.css";

const Saved = () => {
  // const user=localStorage.getItem('profile');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {

    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(data);
        console.log(user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [])
  return <>
    {loading ? <CircularProgress /> :
      <>  <Paper elevation={6} style={{ fontSize: "30px", textAlign: "center", padding: "10px", margin: "30px 0" }}>{user.savedRecipes.length} Saved Recipes</Paper>
        <div className='container'>
          {user.savedRecipes.map(recipe =>
            <div className='recipeCard' >
              <img className='recipeCardImage' src={recipe.image} />
              <p className='recipeCardName'> {recipe.label}</p>
            </div>
          )}
        </div></>
    }
  </>
}

export default Saved