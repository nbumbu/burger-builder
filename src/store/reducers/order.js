import * as actionType from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder ={
                ...action.orderData,
                id: action.order.id
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return {}
    }
}


export default reducer;