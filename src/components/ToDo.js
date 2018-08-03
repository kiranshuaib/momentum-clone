import React from 'react';
import Modal from "react-modal";
import "../styles/ToDo.css";


class ToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			error: undefined,
			todos: [
				'React',
				'JavaScript'
			]
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.addToDo = this.addToDo.bind(this);
		this.deleteToDo = this.deleteToDo.bind(this);
		this.strikeToDo = this.strikeToDo.bind(this);
	}

	// Functions that close and open modal 
	// from the react-modal module
	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	// Loads the todo items when present
    componentDidMount() {
		try {
			const value = localStorage.getItem('todos');
			const options = JSON.parse(value);
		
			if (options) {
				this.setState(() => ({ 
					todos: options 
				}));
			}
		} catch (e) {
			// Do nothing
		}
    }

	// Updates the list of todos when one is added is or deleted
    componentDidUpdate(prevProps, prevState) {
        if (prevState.todos !== this.state.todos.length) {
			const value = JSON.stringify(this.state.todos);
      		localStorage.setItem('todos', value);
        }
    }

    // Grabs the input from the user and adds it to the todos state
    addToDo(e) {
        e.preventDefault();

		const todo = e.target.elements.todo.value.trim().toLowerCase();
		
		// 1. Checks if variable todo is blank
		// 2. Checks if variable todo already exists on the list
		// 3. Default action is to add the todo to the todos list
		if (!todo) {
			this.setState(() => ({ 
				error: 'Enter valid value to add item'
			}));
		} else if (this.state.todos.indexOf(todo) > -1) {
			this.setState(() => ({ 
				error: 'This Todo item already exists'
			}));
			e.target.elements.todo.value = '';
		} else {
			this.setState(() => ({ 
				error: ''
			}));
			this.setState((prevState) => ({todos: prevState.todos.concat(todo)}));
			e.target.elements.todo.value = '';
		}
    }

    // Removes the appropriate todo item
    deleteToDo(todo) {
		this.setState((prevState) => ({
			todos: prevState.todos.filter((item) => item !== todo)
		}));
		this.setState(() => ({ 
			error: ''
		}));
	}
	
	// Strikes through item when checked
	strikeToDo() {
		// TODO: Strike through item when checked
	}
	
	
	
	render() {
		return (
			<div className="ToDo">
				<span onClick={this.handleOpenModal}>Todo</span>
				<Modal
					className="ToDo__Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					{/* Modal Content */}
					<div className="ToDo__Modal__Content">
                        <p id="ToDoCount">{this.state.todos.length} to do{this.state.todos.length > 1 && 's'}</p>
						{this.state.error && <p id="ToDoError">{this.state.error}</p>}

						{
							// Loops through the list of todo items and displays on the modal
							this.state.todos.map((todo) => (
								<div className="ToDoItems" key={todo}>
									<div id="CheckboxItemToDo" onClick={this.strikeToDo}>
										<input type="checkbox" id={todo} name="focus-check" />
										<label htmlFor={todo}></label>
									</div>
									<p id="ToDoItem">{todo}</p>
									<p id="DeleteToDo" onClick={(e) => {
										this.deleteToDo(todo);
									  }}>x</p>
								</div>
							))
						}

						{
							// Form grabs the todo item submitted by the user 
						}						
						<form onSubmit={this.addToDo}>
							<input id="ToDoInput" type="text" name="todo" placeholder="New Todo"/>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ToDo;