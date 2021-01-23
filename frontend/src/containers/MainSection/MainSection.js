
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsSearch, BsCardList } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';

import Bus from '../../components/Bus/Bus';
import SearchForm from '../SearchForm/SearchForm';
import AddBusForm from '../AddBusForm/AddBusForm';
import classes from './MainSection.module.css';
import fetcher from '../../fetchWrapper';
import bus from '../../components/Bus/Bus';

class MainSection extends Component{

    state = {
        onSearchSection: true,
        onViewAllSection: false,
        onAddBusSection: false,
        allBuses: []
    }

    componentDidMount(){
        this.fetchAllBuses();
    }

    fetchAllBuses = async() => {
        let path;
        if(this.props.userInfo && this.props.userInfo.isAdmin)
            path = '/admin-buses?isAdmin=true';
        else
            path = '/buses';
        const result = await fetcher(path, 'GET');
        console.log(result);                            //remove later
        if(!result.success){
            console.log(result);
            this.props.history.push('/error');
        }
        this.setState({allBuses: result.buses});
    }

    searchSectionActiveHandler = () => {
        this.setState({
            onSearchSection: true,
            onViewAllSection: false,
            onAddBusSection: false
        })
    }

    viewAllSectionActiveHandler = () => {
        this.setState({
            onSearchSection: false,
            onViewAllSection: true,
            onAddBusSection: false
        })
    }

    addBusSectionActiveHandler = () => {
        this.setState({
            onSearchSection: false,
            onViewAllSection: false,
            onAddBusSection: true
        })
    }

    redirectToBusDetails = (bus) => {
        this.props.history.push({
            pathname: '/bus-details/' + bus._id,
            data: bus
        })
        // console.log(this.props);
    }

    render(){

        const searchSection = this.state.onSearchSection ? <SearchForm /> : null;

        const buses = this.state.allBuses.map(bus => {
            return <Bus key={bus._id} bus={bus} clicked={() => this.redirectToBusDetails(bus)}/>
        })

        const viewAllSection = this.state.onViewAllSection ? buses : null;

        const addBusSection = this.state.onAddBusSection ? <AddBusForm 
            isAdmin={this.props.userInfo.isAdmin}
            viewAll={this.viewAllSectionActiveHandler}/> : null;

        return (
            <div className={classes.RootContainer}>
                <header>
                    <div onClick={this.searchSectionActiveHandler}>
                        <BsSearch size={24}/>
                        <h2>Search</h2>
                    </div>
                    <div onClick={this.viewAllSectionActiveHandler}>
                        <BsCardList size={24} />
                        <h2>View All</h2>
                    </div>

                    {this.props.userInfo && this.props.userInfo.isAdmin ? (
                        <div onClick={this.addBusSectionActiveHandler}>
                         <BiPlus size={24} />
                         <h2>Add Bus</h2>
                        </div>
                    ) : null}
                   
                </header>
                <main>
                    {searchSection}
                    {viewAllSection}
                    {addBusSection}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        userInfo: state.auth.userDetails
    }
}

export default connect(mapStateToProps)(MainSection);