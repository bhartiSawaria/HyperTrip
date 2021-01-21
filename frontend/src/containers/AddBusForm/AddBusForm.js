import React, { Component } from 'react';
import { BiBus } from 'react-icons/bi';
import { BsCursor, BsHash } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdDateRange } from "react-icons/md";

import classes from './AddBusForm.module.css';

class AddBusForm extends Component{

    state = {
        name: '',
        number: '',
        startLocation: '',
        endLocation: '',
        journeyDate: '',
        errorMessage: ''
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
                    <BiBus size={20}/>
                    <input 
                        type='text'
                        name='name'
                        placeholder='Bus Name'
                        value={this.state.name}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <BsHash size={20}/>
                    <input 
                        type='text'
                        name='number'
                        placeholder='Bus Number'
                        value={this.state.number}
                        onChange={this.inputChangeHandler} />
                </div>
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
                <button>Add</button>
            </div>
        )
    }
}

export default AddBusForm;