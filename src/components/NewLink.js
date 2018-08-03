import React from 'react';
import '../styles/NewLink.css';
import { MdCancel } from 'react-icons/lib/md';

class NewLink extends React.Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            value: 'New Link',
            linkName: ' ',
            linkUrl: ' '
        };

        this.toggleHidden = this.toggleHidden.bind(this);
        this.addLink = this.addLink.bind(this);
        this.deleteLink = this.deleteLink.bind(this);
        this.linkSubmit = this.linkSubmit.bind(this);
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            value: ' ',
        });
    }

    addLink(e) {
        let linkUrl = e.target.form.linkUrl.value;
        linkUrl = linkUrl.indexOf('://') === -1 ? 'http://' + linkUrl : linkUrl;

        // console.log(e.target.value);
        this.setState({
            linkName: e.target.form.linkName.value.trim().toLowerCase(),
            linkUrl: linkUrl,
        });
        // console.log(this.state.linkName);
        // console.log(this.state.linkUrl);
    }

    deleteLink = e => {
        this.setState({
            isHidden: !this.state.isHidden,
            value: 'New Link'
        });
    };

    componentDidMount() {
        try {
            const linkName = localStorage.getItem('linkName');
            const linkNameParsed = JSON.parse(linkName);
            const linkUrl = localStorage.getItem('linkUrl');
            const linkUrlParsed = JSON.parse(linkUrl);

            if (linkNameParsed && linkUrlParsed) {
                this.setState(() => ({
                    linkName: linkNameParsed,
                    linkUrl: linkUrlParsed,
                }));
            }
        } catch (e) {
            // do nothing
        }
    }

    componentDidUpdate(prevState) {
        if (prevState.linkName !== this.state.linkName.length) {
            const linkName = JSON.stringify(this.state.linkName);
            const linkUrl = JSON.stringify(this.state.linkUrl);

            console.log(linkName);
            console.log(linkUrl);

            localStorage.setItem('linkName', linkName);
            localStorage.setItem('linkUrl', linkUrl);
            console.log('Saving Data');
        }
    }

    linkSubmit = e => {
        e.preventDefault();

        this.setState({
            isHidden: !this.state.isHidden,
            value: 'New Link',
        });
    };

    deleteLinkList = () => {
        this.setState({
            linkName: '',
            linkUrl: '',
            // button:!this.state.button
        });
    };

    render() {
        return (
            <div>
                <p onClick={this.toggleHidden}>{this.state.value}</p>
                {!this.state.isHidden && (
                    <form onSubmit={this.linkSubmit}>
                        <input
                            id="link-name"
                            name="linkName"
                            type="text"
                            placeholder="Name"
                            onChange={this.addLink}
                            value={this.state.linkName}
                        />

                        <MdCancel className="icon" onClick={this.deleteLink} />

                        <input
                            id="link-url"
                            type="text"
                            name="linkUrl"
                            placeholder="URL"
                            onChange={this.addLink}
                            value={this.state.linkUrl}
                        />
                        <button className="submit" type="submit" />
                    </form>
                )}

                {this.state.isHidden &&
                    this.state.linkName !== '' &&
                    this.state.linkUrl !== 'http://' && (
                        <div id="link-list">
                            <a id="link-id" href={this.state.linkUrl} target="_blank">
                                {this.state.linkName}
                            </a>
                            <MdCancel className="link-icon" onClick={this.deleteLinkList} />
                        </div>
                    )}
            </div>
        );
    }
}

export default NewLink;
