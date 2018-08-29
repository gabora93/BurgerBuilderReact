import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig =>{
        return <span
        style={{
            textTransform: 'capitalize',
            display:'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'

            }}
             key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    

    return(
        <div className={classes.Order}
          onMouseEnter={props.mouseEnter}
          onMouseLeave={props.mouseEnter}
        >
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
            <p><strong>Order data</strong></p>
            <p>Name: {props.orderdata.name}| E-mail: {props.orderdata.email}</p>
            <p>Address: {props.orderdata.street}| Zip Code: {props.orderdata.zipCode} | {props.orderdata.country}</p>

            {props.hoverState && <div>
            <p>Delivery Method: {props.orderdata.deliveryMethord}</p>
                </div>}


        </div>
    );
    
}

export default order;