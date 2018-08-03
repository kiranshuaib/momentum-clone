import React from 'react';

import '../styles/Time.css';

export default class Time extends React.Component {
    constructor(props) {
        super(props)
        let date = this.getTimeString()
        this.state = { time: date }
    }

     getTimeString = () => {

        var date = new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12:false});
        // var date = new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12:true});
        return date;   
    }

    

    componentDidMount() {
        this.timer = setInterval(() => {
            let date = this.getTimeString();
            this.setState({
                time: date
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    
    render() {

        return (
            <div className="time">
                <p id="Time">{this.state.time}</p> 
            </div>
        )
    }
}

