import React from 'react';
import '../styles/Name.css';
import ReactDOM from 'react-dom';
import Greetings from './Greetings'



export default class Name extends React.Component {
			constructor(props) {
				super(props);
				this.state = { html: '' };
				this.handleChange = this.handleChange.bind(this);
			}

			handleChange(event) {
				this.setState({ html: event.target.value });
				// console.log(this.state.html);
			}

			componentDidMount() {

				const html = localStorage.getItem('html');
				if (html) {
					this.setState(() => ({ html: html }));
				}
				console.log(html);
			}

			componentDidUpdate(prevState) {
				if (prevState.html !== this.state.html) {
		
					const html = this.state.html;
					localStorage.setItem('html', html);
					// console.log('Saving Data');
				}
			}

			render = () => {
				return <div id="greeting" className="app-container greeting transition">
						Good
						<span>
							<Greetings />
						</span>,
						<ContentEditable html={this.state.html} disabled={false // innerHTML of the editable div
					} onChange={this.handleChange} />
					.	
					</div>;
			};
		}

class ContentEditable extends React.Component {
    constructor(props) {
        super(props);
        this.emitChange = this.emitChange.bind(this);

    }
    render() {
        return (
         <span
            className="single-line"
            onInput={this.emitChange}
            onBlur={this.emitChange}
            ref={function (e) { if (e != null) e.contentEditable = true; }}
            dangerouslySetInnerHTML={{ __html: this.props.html }}>
        </span>
        )
    }


    shouldComponentUpdate(nextProps) {
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    emitChange() {
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
}
