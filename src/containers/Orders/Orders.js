import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
const Orders = props => {

    // componentDidMount() {
    //     this.props.onFetchOrders();
    // }
    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders();
    }, [onFetchOrders]);

    let orders = <Spinner></Spinner>
    console.log('mia-props', props)
    if (!props.loading) {
        orders = props.orders.map(
            (order) => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                ></Order>
            }
        )
    }

    return (
        <div>
            {orders}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));