import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Award } from 'lucide-react'
import { Tag } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'

const Advantages = () => {
  return (
    <div className='advantages'>
        <div className="advantage-item">
            <div className="advantage-header">
                <ShoppingCart className='icon' color='#72AEC8' />
                <h3 className='advantage-title'>free delivery</h3>
            </div>
            <p className='advantage-descr'>
            Consectetur adipi elit lorem ipsum dolor sit amet.
            </p>
        </div>
        <div className="advantage-item">
            <div className="advantage-header">
                <Award className='icon' color='#72AEC8' />
                <h3 className='advantage-title'>quality guarantee</h3>
            </div>
            <p className='advantage-descr'>
            Dolor sit amet orem ipsu mcons ectetur adipi elit.
            </p>
        </div>
        <div className="advantage-item">
            <div className="advantage-header">
                <Tag className='icon' color='#72AEC8' />
                <h3 className='advantage-title'>Daily offers</h3>
            </div>
            <p className='advantage-descr'>
            Amet consectetur adipi elit loreme ipsum dolor sit.
            </p>
        </div>
        <div className="advantage-item">
            <div className="advantage-header">
                <ShieldCheck className='icon' color='#72AEC8' />
                <h3 className='advantage-title'>100% secure payment</h3>
            </div>
            <p className='advantage-descr'>
            Rem Lopsum dolor sit amet, consectetur adipi elit.
            </p>
        </div>
    </div>
  )
}

export default Advantages