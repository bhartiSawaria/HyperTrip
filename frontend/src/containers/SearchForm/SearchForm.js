import React, { Component } from 'react';
import { BsCursor } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdDateRange } from "react-icons/md";

import classes from './SearchForm.module.css';

class SearchForm extends Component{

    state = {
        startLocation: '',
        endLocation: '',
        journeyDate: ''
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        return(
            <div className={classes.RootContainer}>
                <div className={classes.InputContainer}>
                    <BsCursor size={20}/>
                    <input 
                        type='text'
                        name='startLocation'
                        placeholder='Start Location'
                        value={this.state.startLocation}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <GoLocation size={20}/>
                    <input 
                        type='text'
                        name='endLocation'
                        placeholder='End Location'
                        value={this.state.endLocation}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <MdDateRange size={20} />
                    <input 
                        type='text'
                        name='journeyDate'
                        placeholder='Date'
                        value={this.state.journeyDate}
                        onChange={this.inputChangeHandler} />
                </div>
                <button>Search</button>
            </div>
        )
    }
}

export default SearchForm;