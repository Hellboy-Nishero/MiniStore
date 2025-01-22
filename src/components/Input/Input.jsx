import React from 'react'

const Input = ({name, required, error, setInputs, index}) => {
  return (
    <div className='input'>
        <input id={index} onChange={setInputs} type='text' className={`${error ? "error" : ""}`} placeholder='' />
        <label htmlFor={index} className="input__title">{name} {required ? "*" : "(optional)"}</label>
    </div>
  )
}

export default Input