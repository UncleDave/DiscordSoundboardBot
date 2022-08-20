import React from 'react';
import cookies from 'js-cookies';

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
    <div className="nav-left">
        <div className="title-container">
            <h1>DiscordSoundboardBot</h1>
        </div>
        <div className="username-container">
            <h2 className="username" id="username"> { cookies.getItem('username') } </h2>
        </div>
    </div>
    <div id="avatar-container" className="avatar-container">
        <img id="avatar" src={ `https://cdn.discordapp.com/avatars/${ cookies.getItem('userid') }/${ cookies.getItem('avatar') }.png` } className="avatar" alt="" width="50px" />
        <div id="log-out-menu" className="log-out-menu log-out-menu-hide">
            <img id="log-out-pointer" className="log-out-pointer" src="log-out-pointer.png" alt="" />
            <button id="log-out-button" className="btn log-out-button" onClick={ () => document.location.href = '/logout' }>log out</button>
        </div>
    </div>
</nav>
    );
  }
}

export default Nav;
