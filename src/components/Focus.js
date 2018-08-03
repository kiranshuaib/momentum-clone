import React from 'react';
import "../styles/Focus.css";

class Focus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            focus: '' 
        };

        this.addFocus = this.addFocus.bind(this);
        this.deleteFocus = this.deleteFocus.bind(this);
        this.strikeText = this.strikeText.bind(this);
    }

    // Loads focus item when the app starts
    componentDidMount() {
        try {
          const value = localStorage.getItem('focus');
          
      
          if (value) {
            this.setState({
                focus: value
            });
          }
        } catch (e) {
          // Do nothing
        }
    }

    // Updates the app when a change is made to focus
    componentDidUpdate(prevProps, prevState) {
        if (prevState.focus !== this.state.focus.length) {
            localStorage.setItem('focus', this.state.focus);
        }
    }

    // Grabs the input from the form 
    // when user submits a focus item
    addFocus(e) {
        e.preventDefault();

        const { value } = this.input;

        if (value === '') { return }

        this.setState({
            focus: value
        });
    }

    // Deletes the focus item
    deleteFocus(e) {
        this.setState({
            focus: ''
        });
    }

    // Strikethrough will add a line through item 
    // when checkbox is ticked
    strikeText() {
        console.log(`Checkbox clicked`);
    }

    render() {
      return (
        <div>   
            {
                // The form displays when there is no focus item
                this.state.focus === '' && (
                    <div className="FocusInput">
                        <form onSubmit={this.addFocus}>
                            <p id="FocusHeader">What is your main focus for today?</p>
                            <input 
                                id="FocusValue" 
                                type="text" 
                                name="focus" 
                                ref={node => this.input = node}
                            />
                        </form>
                    </div>
                )
            }

            {
                // This will display when there is a focus item available
                this.state.focus !== '' && (
                    <div className="FocusInput">
                        <p id="FocusItemHeader">TODAY</p>
                        <div className="FocusParent">
                            <div id="CheckboxItem" onClick={this.strikeText}>
                                <input type="checkbox" id="FocusCheck" name="focus-check" />
                                <label htmlFor="FocusCheck"></label>
                            </div>
                            <p id="FocusItem"  >{this.state.focus}</p>
                            <p id="DeleteItem" onClick={this.deleteFocus}>x</p>
                        </div>
                    </div>
                )
            }
            
        </div>
      );
    }
}

export default Focus;