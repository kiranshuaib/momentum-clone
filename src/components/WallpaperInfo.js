import React from 'react';
import "../styles/WallpaperInfo.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";

class WallpaperInfo extends React.Component {
	constructor() {
		super();
		this.state = { 
      isClicked: false,
      wallpaperName: "",
      wallpaperAuthor: ""
    };

		this.toggleHeart = this.toggleHeart.bind(this);
  }

  componentDidMount() {
    this.getWallpaperInfo();
  }
  
  getWallpaperInfo = async () => {
    try {
      const wallpaperName = await localStorage.getItem("backgroundName");
      const wallpaperAuthor = await localStorage.getItem("backgroundAuthor");
      
      if (wallpaperName && wallpaperAuthor) {
        this.setState({
          wallpaperName,
          wallpaperAuthor
        });
      }
    } catch (err) {
      console.log(err)
    }
  }

	toggleHeart() {
    this.setState({ isClicked: !this.state.isClicked });
  }
  
	render() {
    const { isClicked, wallpaperName, wallpaperAuthor } = this.state;

		return (
      <div id="WallpaperInfo">
        <div className="place">
          <span>
            {wallpaperName}
          </span>
        </div>
				<div className="source">
          <a className="wiki-link" href="#"> 
            <span className="name">
              Photo by, {wallpaperAuthor}
            </span>
          </a>
					<span className="icon" onClick={this.toggleHeart}>
						{isClicked ? <TiHeartFullOutline /> : <TiHeartOutline />}
					</span>
				</div>
      </div>
    );
	}
}

export default WallpaperInfo;