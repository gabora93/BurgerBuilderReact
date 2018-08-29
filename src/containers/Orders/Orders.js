import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
        isHovering: false,
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res =>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({loading:false, orders:fetchedOrders});
                
            })
            .catch(err => {
                this.setState({loading:false})
            })
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
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                        orderdata={order.orderData}
                        mouseEnter={this.handleMouseHover}
                        toggleHoverState={this.toggleHoverState}
                        hoverState={this.state.isHovering}
                        />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);