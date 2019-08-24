import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to="/"></Redirect>
        if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"></Redirect> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCancel={checkoutCancelHandler}
                        checkoutContinue={checkoutContinueHandler}
                        ingredients={props.ings}></CheckoutSummary>
                    <Route path={props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps, null)(Checkout);