import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility'

const ContactData = props => {
    const [formDataState, setFormDataState] = useState(
        {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest', displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest', displayValue: 'Cheapest'
                        },
                    ]
                },
                value: 'fastests',
                validation: {},
                valid: true
            }
        }
    )

    const [formIsValid, setFormIsValid] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault();
        console.log(props.ings)
        const formData = {};
        for (let formElementIdentifier in formDataState) {
            formData[formElementIdentifier] = formDataState[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData
        }

        props.onOrdeBurger(order);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);

        const updatedFormElement = updateObject(formDataState[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, formDataState[inputIdentifier].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(formDataState, {
            [inputIdentifier]: updatedFormElement
        })
        console.log(updatedFormElement)

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        setFormDataState(updatedOrderForm)
        setFormIsValid(formIsValid)
    }

    const formElementsArray = [];
    for (let key in formDataState) {
        formElementsArray.push({
            id: key,
            config: formDataState[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(
                formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validation}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)} />
                )
            )}
            <Button
                type="submit"
                btnType="Success"
                clicked={orderHandler}
                disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contant data!</h4>
            {form}
        </div>)
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdeBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));