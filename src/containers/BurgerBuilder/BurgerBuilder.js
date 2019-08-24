import React, { useState, useEffect, useCallback } from 'react';


import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {

    const [purchasingState, setPurchasingState] = useState(false);


    const dispatch = useDispatch();
    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    })

    const price = useSelector(state => {
        console.log('burger',state.burgerBuilder)
        return state.burgerBuilder.totalPrice
    })

    const error = useSelector(state => {
        return state.burgerBuilder.error
    })

    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredient) => dispatch(actions.removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());


    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce(
            (sum, el) => {
                return sum + el;
            }, 0)
        console.log('the sum is: ' + sum)
        return sum > 0;
    }

    const purchaseHandler = () => {
        setPurchasingState(true)
    }

    const purchaseCancelHandler = () => {
        setPurchasingState(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push({
            pathname: '/checkout'
        });
    }

    const disbledInfo = {
        ...ings
    }

    for (let key in disbledInfo) {
        disbledInfo[key] = disbledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = error ? <p>Ingredients can not be loaded</p> : <Spinner />
    console.log('price', price)
    if (ings) {
        burger = (<Aux>
            <Burger ingredients={ings} />
            <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabledInfo={disbledInfo}
                price={price}
                purchasable={updatePurchaseState(ings)}
                ordered={purchaseHandler} />
        </Aux>)
        orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price.toFixed(2)} />
    }

    return (
        <Aux>
            <Modal show={purchasingState} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}

        </Aux>
    )
}

export default (withErrorHandler(BurgerBuilder, axios));