
import React from 'react';

import classes from './Bus.module.css';

const bus = (props) => {
    return (
        <div className={classes.RootContainer}>
            <div className={classes.UpperContainer}>
                <div>
                    <h2>Departure On </h2>
                    <p>1:00 pm</p>
                </div>
                <div>
                    <h2>Total travel time</h2>
                    <p>6 hour</p></div>
                <div>
                    <h2>Seat</h2> 
                    <p>40</p>
                </div>
            </div>
            <div className={classes.LowerContainer}>
                <div>
                    <div><span />Jamunanagar <p>start</p></div>
                    <div><span />Ahmedabad <p> end</p></div>
                </div>
                <div>
                    <div className={classes.PriceDiv}> ₹ 240</div>
                    <button>Book now</button>
                </div>
            </div>
        </div>
    )
}

export default bus;