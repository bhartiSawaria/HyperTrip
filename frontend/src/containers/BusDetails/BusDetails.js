
import React, { Component } from 'react';
import { FaBity } from "react-icons/fa";
import { connect } from 'react-redux';

import fetcher from '../../fetchWrapper';
import classes from './BusDetails.module.css';

class BusDetails extends Component {

    state = {
        busId: this.props.match.params.busId,
        bookedSeats: [],
        selectedSeats: []
    }

    componentDidMount(){
        this.getBusDetails();
    }

    getBusDetails = async() => {
        const busId = this.state.busId;
        const result = await fetcher('/booked-seats/' + busId, 'GET');
        console.log(result);                                            // remove later
        if(!result.success){
            return this.props.history.push('/error');
        }
        this.setState({bookedSeats: result.bookedSeats});
    }

    seatClickHandler = (event) => {
        console.log(event.target.className);
        console.log(event.target.id);
        if(this.props.isAdmin){

        }
        else{
            if(event.target.className.includes('Indigo')){
                event.target.className = classes.Blue;
                const updatedSelectedSeats = [...this.state.selectedSeats];
                updatedSelectedSeats.push(event.target.id);
                this.setState({selectedSeats: updatedSelectedSeats}, () => console.log(this.state));
            }
            else if(event.target.className.includes('Blue')){
                event.target.className = classes.Indigo;;
                const updatedSelectedSeats = [...this.state.selectedSeats];
                const index = updatedSelectedSeats.indexOf(event.target.id);
                updatedSelectedSeats.splice(index, 1);
                this.setState({selectedSeats: updatedSelectedSeats}, () => console.log(this.state));
            }
        }
    }

    buyTicketHandler = async() => {
        if(this.state.selectedSeats.length === 0)
            return;
        const body = {
            busId: this.state.busId,
            selectedSeats: [...this.state.selectedSeats]
        };
        const result = await fetcher('/book-ticket', 'POST', JSON.stringify(body));
        console.log(result);                                        // remove later
        if(!result.success){
           return this.props.history.push('/error');
        }
        this.props.history.push('/dashboard');
    }

    render(){

        const seatsContainer = [];
        let j = 1;
        for(let i=1; i<=48; i++){
            if(i % 3 == 0 && i % 2 != 0)
                seatsContainer.push(<span key={i} className={classes.BlankSeat}></span>)
            else{
                let divClass = this.state.bookedSeats.includes(j) ? classes.Grey : classes.Indigo; 
                seatsContainer.push(
                    <div 
                        key={i} 
                        id={j}
                        className={divClass}
                        onClick={this.seatClickHandler}>{j}</div>
                );
                j++;
            }
        }

        return(
            <div className={classes.RootContainer}>
                <div className={classes.BusInfoContainer}>
                    <h1>Select Seats</h1>
                    <div className={classes.StatusContainer}>
                        <div>
                            <span className={classes.Indigo} />
                            <p>Available</p>
                        </div>
                        <div>
                            <span className={classes.Grey} />
                            <p>Reserved</p>
                        </div>

                        {!this.props.isAdmin ? (
                            <div>
                                <span className={classes.Blue} />
                                <p>Selected</p>
                            </div>
                        ): null}
                        
                    </div>
                    <div className={classes.DriverSymbol}>
                        <div>
                            <FaBity size={45} /> <br/>
                            <span>Driver</span>
                        </div>
                    </div>
                    <div className={classes.SeatsContainer}>
                        {seatsContainer}
                    </div>
                </div>
                {this.props.isAdmin ? (
                    <div className={classes.TicketBookerInfo}>
                        <p>
                            Booked By
                        </p>
                        <div>
                            <p>Name:  Bharti</p>
                            <p>E-mail:  bhartisawaria71@gmail.com</p>
                            <p>Gender:  Female</p>
                            <p>Phone no:  1234567890</p>
                        </div>
                    </div>
                ) : null}
                {!this.props.isAdmin ? (
                    <div className={classes.TicketBookerInfo}>
                        <h2>
                            Details
                        </h2>
                        <div>
                            <p>Name:  {this.props.userInfo.name}</p>
                            <p>Seats: {this.state.selectedSeats.length}</p>
                            <p>Amount: 250</p>
                        </div>
                        <button onClick={this.buyTicketHandler}>
                            {this.props.isAdmin ? 'Reset' : 'Buy'}
                        </button>
                    </div>
                ) : null}    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      userInfo: state.auth.userDetails
    }
  }
  

export default connect(mapStateToProps)(BusDetails);