import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BiBus } from 'react-icons/bi';
import { BsCursor, BsHash } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { MdDateRange } from 'react-icons/md';

import fetcher from '../../fetchWrapper';
import classes from './AddBusForm.module.css';

class AddBusForm extends Component{

    state = {
        busInfo: {
            name: '',
            number: '',
            startCity: '',
            endCity: '',
            journeyDate: ''
        },
        errorMessage: ''
    }

    inputChangeHandler = (event) => {
        const updatedBusInfo = {...this.state.busInfo};
        updatedBusInfo[event.target.name] = event.target.value;
        this.setState({
            busInfo: updatedBusInfo
        });
    }

    isFormValid = () => {
        const { name, number, startCity, endCity, journeyDate } = this.state.busInfo;
        const res =  name.trim().length && number.trim().length && 
                startCity.trim().length && endCity.trim().length && 
                journeyDate.trim().length;
        console.log(res);
        return res;
    }

    formSubmitHandler = async() => {
        if(!this.isFormValid()){
            this.setState({errorMessage: 'Please enter all the fields.'});
            return;
        }

        const body = {...this.state.busInfo, isAdmin: this.props.isAdmin};
        const result = await fetcher('/add-bus', 'POST',JSON.stringify(body));
        console.log(result);                                        // remove later
        if(!result.success){
            this.props.history.push('/error');
        }
        else{
            this.props.viewAll();
        }    
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
                        value={this.state.busInfo.name}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <BsHash size={20}/>
                    <input 
                        type='text'
                        name='number'
                        placeholder='Bus Number'
                        value={this.state.busInfo.number}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <BsCursor size={20}/>
                    <input 
                        type='text'
                        name='startCity'
                        placeholder='Start Location'
                        value={this.state.busInfo.startCity}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <GoLocation size={20}/>
                    <input 
                        type='text'
                        name='endCity'
                        placeholder='End Location'
                        value={this.state.busInfo.endCity}
                        onChange={this.inputChangeHandler} />
                </div>
                <div className={classes.InputContainer}>
                    <MdDateRange size={20} />
                    <input 
                        type='date'
                        name='journeyDate'
                        placeholder='Date'
                        value={this.state.busInfo.journeyDate}
                        onChange={this.inputChangeHandler}
                        style={{color: 'grey', outline: 'none'}} />
                </div>
                <button onClick={this.formSubmitHandler}>Add</button>
            </div>
        )
    }
}

export default withRouter(AddBusForm);