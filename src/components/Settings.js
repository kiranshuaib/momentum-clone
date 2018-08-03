import React from 'react';
import Modal from "react-modal";
import "../styles/Settings.css";

class Settings extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
    }

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
    }
    
	render() {
		return (
			<div className="Settings">
				<span onClick={this.handleOpenModal}>
					<i className="fas fa-cog"></i>
				</span>
				<Modal
					className="Settings__Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					{/* Modal Content */}
					<div className="Settings__Modal__Content">
                        <div className="Settings__Left">
							<h3 class="Settings__Left__Header">General</h3>
							<ul>
								<a href="#"><li>Todo</li></a>
								<a href="#"><li>Photos</li></a>
								<a href="#"><li>Quotes</li></a>
								<a href="#"><li>Links</li></a>
								<a href="#"><li>Balance</li></a>
							</ul>
							<ul>
								<a href="#"><li>Help</li></a>
								<a href="#"><li>What's new</li></a>
								<a href="#"><li>About</li></a>
								<a href="#"><li>Upgrade to Plus</li></a>
							</ul>
							<a href="#">
								<div class="Settings__Login">
									<p>Log In</p>
									<p>Sync your account and more!</p>
								</div>
							</a>
                        </div>
                        <div className="Settings__Right">
							<h2 class="Settings__Right__Header">General</h2>

							<h3 class="Settings__Right__Header">SHOW</h3>
							<ul>
								<li>Links</li>
								<li>Bookmarks Bar</li>
								<li>Search</li>
								<li>Weather</li>
								<li>Focus</li>
								<li>Quote</li>
								<li>Todo</li>
								<li>Countdown</li>
								<li>Notes</li>
							</ul>

							<h3 class="Settings__Right__Header">CUSTOMIZE</h3>
							<ul>
								<li>Theme</li>
								<li>Font</li>
							</ul>

							<h3 class="Settings__Right__Header">OPTIONS</h3>
							<ul>
								<li>Clock Format</li>
								<li>Percent Clock</li>
								<li>Search Provider</li>
							</ul>

							<h5>Tip</h5>
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, impedit?</p>
                        </div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Settings;