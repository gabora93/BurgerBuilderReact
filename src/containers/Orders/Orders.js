import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect} from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        isHovering: false,
    }

    componentDidMount(){
      this.props.onFetchOrders(this.props.token);
    } 

    handleMouseHover=()=> {
        console.log('hovermen')
        this.setState(this.toggleHoverState);
      }
    
      toggleHoverState=(state)=> {
        return {
          isHovering: !state.isHovering,
        };
      }


    render(){
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                        orderdata={order.orderData}
                        mouseEnter={this.handleMouseHover}
                        toggleHoverState={this.toggleHoverState}
                        hoverState={this.state.isHovering}
                        />
                ))
            
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(Orders, axios));