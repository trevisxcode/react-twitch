import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: "536781181026-c31nqnvsc75cq77oujkn34qldsoadplh.apps.googleusercontent.com",
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthDidChange);
      });
    });
  }

  onAuthDidChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  };

  onSignInDidClick = () => {
    this.auth.signIn();
  };

  onSignOutDidClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    // try in console
    // > gapi.auth2.getAuthInstance().signIn()
    // > gapi.auth2.getAuthInstance().signOut()
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutDidClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInDidClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth
