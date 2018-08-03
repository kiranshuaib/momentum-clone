import React from "react";
import "../styles/Quote.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";
import FaTwitter from "react-icons/lib/fa/twitter";
import GoQuote from "react-icons/lib/go/quote";

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false }
  }
  
  toggleHeart = () => {
    this.setState({ isClicked: !this.state.isClicked });
  }

  shareOnTwitter = () => {
    const quoteLine = `"${this.props.quote.trim()}" — ${this.props.author}`;
    const href = `https://twitter.com/intent/tweet?text=${quoteLine}`;
    window.open(
      href,
      "Twitter",
      "height=420, width=550, top=190px, left=365px"
    );
  }

  render() {
    const { quote, author } = this.props;

    return (
      <div id="Quote">
        <div className="Quote__Container">
          <p>
            <span>
              <GoQuote />
            </span>
            {quote}
          </p>
        </div>
        <div className="Action__Container">
          <Actions
            author={author}
            isClicked={this.state.isClicked}
            toggleHeart={this.toggleHeart}
            shareOnTwitter={this.shareOnTwitter}
          />
        </div>
      </div>
    );
  }
}

function Actions({ isClicked, author, toggleHeart, shareOnTwitter }) {
	return (
		<div className="Actions">
      <span id="quote-author">
        {author}
      </span>
			<span id="quote-heart" onClick={() => toggleHeart()}>
				{isClicked ? <TiHeartFullOutline /> : <TiHeartOutline />}
			</span>
      <span id="quote-twitter" onClick={() => shareOnTwitter()}>
				<FaTwitter />
			</span>
		</div>
	);
}

export default Quote;