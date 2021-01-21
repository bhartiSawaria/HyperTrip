
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsSearch, BsCardList } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';

import Bus from '../../components/Bus/Bus';
import SearchForm from '../SearchForm/SearchForm';
import classes from './MainSection.module.css';
import AddBusForm from '../AddBusForm/AddBusForm';

class MainSection extends Component{

    state = {
        onSearchSection: true,
        onViewAllSection: false,
        onAddBusSection: false
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

    render(){

        const searchSection = this.state.onSearchSection ? <SearchForm /> : null;

        const viewAllSection = this.state.onViewAllSection ? <Bus 
            showBackdropHandler = {this.showBackdropHandler}/> : null;

        const addBusSection = this.state.onAddBusSection ? <AddBusForm /> : null;

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