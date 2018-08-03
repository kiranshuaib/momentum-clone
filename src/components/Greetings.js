import React from 'react';
import '../styles/Greetings.css';


class Greetings extends React.Component {
    constructor(props) {
        super(props)

        this.state = { greetings: "morning" }

    }
    componentDidMount = () => {
        this.timer = setInterval(() => {

            let curHr = new Date().getHours();
            if (curHr < 12) {
                this.setState({ greetings: 'morning' });
            } else if (curHr < 18) {
                this.setState({ greetings: 'afternoon' });
            } else {
                this.setState({ greetings: 'evening' });
            }
        }, 1000);
    }



    render() {
        return (
            <div>
                <p id="greet-state" onClick={this.greetings}>{this.state.greetings}</p>

            </div>

        )
    }


}

export default Greetings;