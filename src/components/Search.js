import React from 'react';
import "../styles/Search.css";

import FaSearch from "react-icons/lib/fa/search";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    };
    this.toggleShowForm = this.toggleShowForm.bind(this);
  }

  toggleShowForm(e) {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const { showForm } = this.state;
    const addClass = showForm && "add-line";

    return <div id="Search">
				<div className={`Search__Wrapper ${addClass}`}>
					<span onClick={this.toggleShowForm}>
						<FaSearch />
					</span>
					{showForm && <SearchForm />}
				</div>
			</div>;
  }
}

function SearchForm() {
  return (
    <div id="Search__Form">
      <form action="https://www.google.com/search?">
        <input type="text" name="q"/>
      </form>
    </div>
  );
}

export default Search;