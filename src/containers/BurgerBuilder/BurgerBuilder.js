import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {

    const [purchasingState, setPurchasingState] = useState(false);

    useEffect(() => {
        props.onInitIngredients()
    }, [])

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
        props.onInitPurchase();
        props.history.push({
            pathname: '/checkout'
        });
    }

        const disbledInfo = {
            ...props.ings
        }

        for (let key in disbledInfo) {
            disbledInfo[key] = disbledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = props.error ? <p>Ingredients can not be loaded</p> : <Spinner />
        console.log(props.ings)
        if (props.ings) {
            burger = (<Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabledInfo={disbledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler} />
            </Aux>)
            orderSummary = <OrderSummary
                ingredients={props.ings}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.price.toFixed(2)} />
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));