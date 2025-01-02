import React, { useEffect, useState } from 'react'

const modalWindow = () => {

    const [active, setActive] = useState(null);




    const closeWindow = (e) => {
        if(e.target){
            setActive(false);
            setTimeout(() => {
                e.target.style.display = "none";
            }, 400);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setActive(true); 
         }, 10);
    }, []);

  return (
    <div onClick={closeWindow} className={`modalWindow ${active ? "active" : ""}`}>
        <div className="text">
            <h1 className="window__title">This page is not finished yet!</h1>
            <p className='window__descr'>But it will be available soon!!!</p>
        </div>
    </div>
  )
}

export default modalWindow