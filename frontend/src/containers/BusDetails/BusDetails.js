
import React, { Component } from 'react';
import { FaBity } from "react-icons/fa";

import classes from './BusDetails.module.css';

class SeatsDetail extends Component {
    render(){
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
                        <div>
                            <span className={classes.Blue} />
                            <p>Selected</p>
                        </div>
                    </div>
                    <div className={classes.DriverSymbol}>
                        <div>
                            <FaBity size={45} /> <br/>
                            <span>Driver</span>
                        </div>
                    </div>
                    <div className={classes.SeatsContainer}>
                        <div>1</div>
                        <div>2</div>
                        <div></div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>

                        <div>6</div>
                        <div>7</div>
                        <div></div>
                        <div>8</div>
                        <div>9</div>
                        <div>10</div>

                        <div>11</div>
                        <div>12</div>
                        <div></div>
                        <div>13</div>
                        <div>14</div>
                        <div>15</div>

                        <div>16</div>
                        <div>17</div>
                        <div></div>
                        <div>18</div>
                        <div>19</div>
                        <div>20</div>

                        <div>21</div>
                        <div>22</div>
                        <div></div>
                        <div>23</div>
                        <div>24</div>
                        <div>25</div>

                        <div>26</div>
                        <div>27</div>
                        <div></div>
                        <div>28</div>
                        <div>29</div>
                        <div>30</div>

                        <div>31</div>
                        <div>32</div>
                        <div></div>
                        <div>33</div>
                        <div>34</div>
                        <div>35</div>

                        <div>36</div>
                        <div>37</div>
                        <div></div>
                        <div>38</div>
                        <div>39</div>
                        <div>40</div>
                    </div>
                    <button>
                        {this.props.isAdmin ? 'Reset' : 'Buy'}
                    </button>
                </div>
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
            </div>
        )
    }
}

export default SeatsDetail;