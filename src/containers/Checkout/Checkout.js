import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {


    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }



    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    onCheckoutContinued={this.onCheckoutContinuedHandler}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    />
                <Route 
                path={this.props.match.path + '/contact-data'}  component={ContactData}/>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(Checkout);