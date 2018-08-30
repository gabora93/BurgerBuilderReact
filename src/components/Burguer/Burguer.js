import React from 'react';
import classes from './Burguer.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';
import { withRouter } from 'react-router-dom';


const Burguer = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i)=>{
                return <BurguerIngredient key={ingKey + i} type={ingKey}/>
            }) // [,]
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        },[]);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding some ingredients</p>
    }
    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(Burguer);