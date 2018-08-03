import React from "react";
import Quote from "./Quote";
import "../styles/Quote.css";

class QuoteContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
      quoteText: "", 
      quoteAuthor: "",
    };
	}

	componentDidMount() {
    this.loadQuote();
    this.callAtMidnight();
  }

  // Schedule to get a new quote every midnight
  callAtMidnight = () => {
    const currentTime = new Date().getTime();
    const setTime = new Date().setHours(24, 0, 0, 0); // set to midnight
    let timeLeft;

    // It's before midnight,
    if (currentTime < setTime) {
      timeLeft = setTime - currentTime;
    // It's after midnight, schedule for tomorrow at 12:00am
    } else {
      timeLeft = setTime + 86400000 - currentTime;
    }
    // Call the function 3 hours later from now (if timeLeft = 3h)
    // console.log("timeLeft", timeLeft)
    setTimeout(() => {
      // Repeat every 24h
      setInterval(() => {
				this.getQuote();
			}, 86400000);
    }, timeLeft); 
  };

  // If there is no quote stored, call getQuote function.
  loadQuote = async () => {
    try {
      const quoteObj = await localStorage.getItem("quoteObj");
      if (quoteObj) {
        const parsedQuote = JSON.parse(quoteObj);
        const { quoteText, quoteAuthor } = parsedQuote;

        this.setState({ quoteText, quoteAuthor });
        console.log("loading from local storage", this.state);
      } else {
        this.getQuote();
      }
    } catch (err) {
      console.log(err);
    }
  };

	getQuote = () => {
    // 👇 Enables cross-origin requests. More info: https://cors-anywhere.herokuapp.com/
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const endPoint = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;

    fetch(proxyUrl + endPoint)
			.then(response => response.json())
			.then(json => {
				console.log(json);
        const { quoteText, quoteAuthor } = json;
        this.setState({ quoteText, quoteAuthor });
        this.saveQuote(this.state);
        console.log("loading from state", this.state)
			})
			.catch(err => {
				console.log(err);
			});
	};

	saveQuote = quoteState => {
    localStorage.setItem("quoteObj", JSON.stringify(quoteState));
  };

	render() {
    const { quoteText, quoteAuthor } = this.state;

		return (
      <Quote quote={quoteText} author={quoteAuthor} />
    );
	}
}

export default QuoteContainer;