import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';





class BurguerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
       
    }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum + el;
            }, 0);
            return sum > 0;
    }


    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectpath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }


    render(){
        const  disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burguer = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if(this.props.ings){
            burguer =  (
                <Auxiliary>
                    <Burguer ingredients={this.props.ings}/>
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    isAuth={this.props.isAuth}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    />
            </Auxiliary>);

            orderSummary =  <OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                
                                price={this.props.price}
                            />
        }

        
        return(
          <Auxiliary>
              <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                 {orderSummary}
              </Modal>
             {burguer}
          </Auxiliary>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectpath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurguerBuilder, axios));