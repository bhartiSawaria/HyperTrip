
import React, { Component } from 'react';
import { BsSearch, BsCardList } from 'react-icons/bs';

// import Bus from '../../components/Bus/Bus';
// import SearchForm from '../SearchForm/SearchForm';
import SeatDetails from '../SeatsDetail/SeatsDetail';
import classes from './HomePage.module.css';

class HomePage extends Component{
    render(){
        return (
            <div className={classes.RootContainer}>
                <header>
                    <div>
                        <BsSearch size={24}/>
                        <h2>Search</h2>
                    </div>
                    <div>
                        <BsCardList size={24} />
                        <h2>View All</h2>
                    </div>
                </header>
                <main></main>
                {/* <Bus /> */}
                {/* <SearchForm /> */}
                <SeatDetails/>
            </div>
        )
    }
}

export default HomePage;