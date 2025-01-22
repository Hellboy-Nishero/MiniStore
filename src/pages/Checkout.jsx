import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import Subscription from '../components/Subscription/Subscription'
import Footer from '../components/Footer/Footer'
import { ProductContext } from '../context/ProductContext'
import Input from '../components/Input/Input'

const Checkout = () => {

    const {total, addedProducts} = useContext(ProductContext);

    const [inputs, setInputs] = useState({
            firstname: {
                value: "",
                error: false,
                required: true
            },
            surname: {
                value: "",
                error: false,
                required: true
            },
            company: {
                value: "",
                error: false,
                required: false
            },
            country: {
                value: "",
                error: false,
                required: true
            },
            street: {
                value: "",
                error: false,
                required: true
            },
            town: {
                value: "",
                error: false,
                required: true
            },
            state: {
                value: "",
                error: false,
                required: true
            },
            zip: {
                value: "",
                error: false,
                required: true
            },
            phone: {
                value: "",
                error: false,
                required: true
            },
            email: {
                value: "",
                error: false,
                required: true
            },
            notes: {
                value: "",
                error: false,
                required: false
            }
});

const [radio, setRadio] = useState("direct");


//Submit form
//On usual project I should also validate the inputs but for this demo-project I skipped it
const onSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    let updatedInputs = {...inputs};
    if(addedProducts.length === 0){
        hasError = true;
        alert("No products in cart!");
    }
    for(let key in updatedInputs){
        if(updatedInputs[key].required && !updatedInputs[key].value.trim()){
            hasError = true;
            updatedInputs[key].error = true;
        } else {
            updatedInputs[key].error = false;
        }
    }

    setInputs(updatedInputs);

    if(!hasError){
        let formValues = {
            name: inputs.firstname.value,
            surname: inputs.surname.value,
            company: inputs.company.value,
            country: inputs.country.value,
            street: inputs.street.value,
            town: inputs.town.value,
            state: inputs.state.value,
            zip: inputs.zip.value,
            phone: inputs.phone.value,
            email: inputs.email.value,
            notes: inputs.notes.value,
            radio: radio,
            total: total.toFixed(2),
            products: addedProducts
        }
        alert("Ordered successful!\n" + JSON.stringify(formValues));
        // =========> fetch(URL, {
        // method: "POST",
        //body: formValues
        //}).then(resp => resp.json())
        //.then(data => handleSuccess(data))
        //.catch(err => handleError(err))
    } else {
        window.scrollTo(0, 250);
    }
}


useEffect(() => {
}, [inputs, radio])


  return (
    <div className='container'>
        <Navbar />
        <Header active={"Checkout"} />
        <main className="main-content">
            <form onSubmit={onSubmit} className="details">
                <div className="inputs">
                <div className="billing-details">
                    <h3 className='billing-details__header'>billing details</h3>
                        <Input name={"first name"} 
                        required={inputs.firstname.required} 
                        error={inputs.firstname.error} 
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, firstname: {...prevInputs.firstname, value: e.target.value}})) } />
                        <Input name={"last name"} 
                        required={inputs.surname.required}  
                        error={inputs.surname.error} 
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, surname: {...prevInputs.surname, value: e.target.value}})) } />
                        <Input name={"company name"} 
                        required={inputs.company.required} 
                        error={inputs.company.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, company: {...prevInputs.company, value: e.target.value}})) } />
                        <Input name={"country / region"} 
                        required={inputs.country.required}  
                        error={inputs.country.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, country: {...prevInputs.country, value: e.target.value}})) } />
                        <Input name={"street address"} 
                        required={inputs.street.required} 
                        error={inputs.street.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, street: {...prevInputs.street, value: e.target.value}})) } />
                        <Input name={"town / citi"}
                        required={inputs.town.required} 
                        error={inputs.town.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, town: {...prevInputs.town, value: e.target.value}})) } />
                        <Input name={"state"} 
                        required={inputs.state.required} 
                        error={inputs.state.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, state: {...prevInputs.state, value: e.target.value}})) } />
                        <Input name={"ZIP-code"} 
                        required={inputs.zip.required}  
                        error={inputs.zip.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, zip: {...prevInputs.zip, value: e.target.value}})) } />
                        <Input name={"phone"} 
                        required={inputs.phone.required}  
                        error={inputs.phone.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, phone: {...prevInputs.phone, value: e.target.value}})) } />
                        <Input name={"email address"} 
                        required={inputs.email.required} 
                        error={inputs.email.error}
                        setInputs={(e) => setInputs(prevInputs => ({...prevInputs, email: {...prevInputs.email, value: e.target.value}})) } />
                </div>
                <div className="additional-info">
                    <h3 className='additional-info__header'>additional information</h3>
                    <Input name={"order notes"} 
                    required={inputs.notes.required} 
                    error={inputs.notes.error}
                    setInputs={(e) => setInputs(prevInputs => ({...prevInputs, notes: {...prevInputs.notes, value: e.target.value}})) } />
                </div>
                </div>  

                <section className='totals-section'>
                    <h3 className='totals__header'>cart totals</h3>
                    <div className="totals">
                        <span className="total">total</span>
                        <span className='total__price'>${total.toFixed(2)}</span>
                    </div>
            </section>
            <div className="radio-btns">
                <div className="radio-btn">
                    <input id='direct' onChange={(e) => setRadio(e.target.value)} name="payment" type="radio" value={"direct"} defaultChecked />
                    <label htmlFor='direct' className='radio-btn_title'>Direct bank transfer</label>
                </div>
                <div className="radio-btn">
                    <input id='check' onChange={(e) => setRadio(e.target.value)} name="payment" type="radio" value={"check"} />
                    <label htmlFor='check' className='radio-btn_title'>Check payments</label>
                </div>
                <div className="radio-btn">
                    <input id='cash' onChange={(e) => setRadio(e.target.value)} name="payment" type="radio" value={"cash"} />
                    <label htmlFor="cash" className='radio-btn_title'>Cash on delivery</label>
                </div>
                <div className="radio-btn">
                    <input id='paypal' onChange={(e) => setRadio(e.target.value)} name="payment" type="radio" value={"paypal"} />
                    <label htmlFor='paypal' className='radio-btn_title'>Paypal</label>
                </div>
            </div>
            <button className='btn btn-primary' type='submit'>place an order</button>
            </form>
            <section className="subscription-section">
                <Subscription />
            </section>
        </main>
        <Footer />
    </div>
  )
}

export default Checkout