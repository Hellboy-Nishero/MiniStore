import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Subscription from '../components/Subscription/Subscription'
import Input from '../components/Input/Input'

const Contact = () => {

  const [inputs, setInputs] = useState({
    fullname: {
      value: "",
      error: false,
      required: true
    },
    email: {
      value: "",
      error: false,
      required: true
    },
    phone: {
      value: "",
      error: false,
      required: false
    },
    subject: {
      value: "",
      error: false,
      required: false
    },
    message: {
      value: "",
      error: false,
      required: true
    }
  })


  const onSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    let updatedInputs = {...inputs};

    for(const key in updatedInputs){
      if(updatedInputs[key].required && !updatedInputs[key].value.trim()){
        hasError = true;
        updatedInputs[key].error = true;
      } else{
        updatedInputs[key].error = false;
      }
    }

    setInputs(updatedInputs);
    if(!hasError){
      let formValues = {
        fullname: inputs.fullname.value,
        email: inputs.email.value,
        phone: inputs.phone.value,
        subject: inputs.subject.value,
        message: inputs.message.value
      }
      alert("Form sent!\n" + JSON.stringify(formValues));
      // ========> fetch(URL, {
      // method: "POST",
      // body: formValues})
      //.then(res => res.json())
      //.then(data => handleSuccess(data))
      //.catch(err => handleError(err))
    }
  }


  return (
    <div className='container'>
        <Navbar active={"contact"} />
        <Header active={"Contact"} />
        <main className="main-content">
          <section className="info-questions">
            <div className="contact-info">
              <h3 className='contact__header'>contact info</h3>
              <p className='contact__descr'>Tortor dignissim convallis aenean et tortor at risus viverra adipiscing.</p>
              <div className="contacts">

                <div className="office">
                  <h3>office</h3>
                  <p className='address'>730 Glenstone Ave 65802, Springfield, US</p>
                  <p className="number">+123 222 333 44</p>
                  <p className="number">+123 666 777 88</p>
                  <p className="email">ministore@yourinfo.com</p>
                </div>

                <div className="management">
                <h3>managment</h3>
                  <p className='address'>730 Glenstone Ave 65802, Springfield, US</p>
                  <p className="number">+123 222 333 44</p>
                  <p className="number">+123 666 777 88</p>
                  <p className="email">ministore@yourinfo.com</p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="questions">
                <h3 className='questions__header'>any questions?</h3>
                <p className="questions__descr">Use the form below to get in touch with us.</p>
                <div className="inputs">
                  <Input name={"your full name"}
                  required={inputs.fullname.required}
                  error={inputs.fullname.error}
                  setInputs={(e) => setInputs(prevInput => ({...prevInput, fullname: {...prevInput.fullname, value: e.target.value}}))}
                  index={1} />
                  <Input name={"write your email here"}
                  required={inputs.email.required}
                  error={inputs.email.error}
                  setInputs={(e) => setInputs(prevInput => ({...prevInput, email: {...prevInput.email, value: e.target.value}}))}
                  index={2} />
                </div>
                <Input name={"phone number"}
                  required={inputs.phone.required}
                  error={inputs.phone.error}
                  setInputs={(e) => setInputs(prevInput => ({...prevInput, phone: {...prevInput.phone, value: e.target.value}}))}
                  index={3} />
                <Input name={"write your subject here"}
                  required={inputs.subject.required}
                  error={inputs.subject.error}
                  setInputs={(e) => setInputs(prevInput => ({...prevInput, subject: {...prevInput.subject, value: e.target.value}}))}
                  index={4} />
                <Input name={"write your message here"}
                  required={inputs.message.required}
                  error={inputs.message.error}
                  setInputs={(e) => setInputs(prevInput => ({...prevInput, message: {...prevInput.message, value: e.target.value}}))} 
                  index={5} />
                  <button className='btn btn-primary' type='submit'>submit</button>
            </form>
          </section>

          <section className="stores-section">
            <img src="../../public/Rectangle%20259.svg" alt="" />
            <div className="store-list">
              <h3 className='store-list__header'>our stores</h3>
              <p className="store-list__descr">You can also directly buy products from our stores.</p>
              <div className="countries">
                <div className="usa">
                  <h3>usa</h3>
                  <p className="address">730 Glenstone Ave 65802, Springfield, US</p>
                  <p className="number">+123 222 333 44</p>
                  <p className="number">+123 222 333 44</p>
                  <p className="email">ministore@yourinfo.com</p>
                </div>
                <div className="france">
                <h3>france</h3>
                  <p className="address">13 Rue Montmartre 75001, Paris, France</p>
                  <p className="number">+123 222 333 44</p>
                  <p className="number">+123 222 333 44</p>
                  <p className="email">ministore@yourinfo.com</p>
                </div>
              </div>
            </div>
          </section>

          <section className='subscription-section'>
              <Subscription />
          </section>
        </main>

        <Footer />

    </div>
  )
}

export default Contact