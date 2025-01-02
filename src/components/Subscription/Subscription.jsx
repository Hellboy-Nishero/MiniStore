import React from 'react'

const Subscription = () => {
  return (
    <div className='subscription'>
        <div className="subscription-left">
            <h3 className="subscription__title">subscribe us now</h3>
            <p className='subscription__descr'>Get latest news, updates and deals directly mailed to your inbox.</p>
        </div>
        <div className="subscription-right">
            <input type="email" id='subscription' placeholder='Your email address here' />
            <button className='btn btn-secondary'>subscribe</button>
        </div>
    </div>
  )
}

export default Subscription