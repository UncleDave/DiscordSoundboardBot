import React from 'react';
import cookies from 'js-cookies';

class Nav extends React.Component {
  render() {
    return (
      <nav class="nav">
    <div class="nav-left">
        <div class="title-container">
            <h1>DiscordSoundboardBot</h1>
        </div>
        <div class="username-container">
            <h2 class="username" id="username"> { cookies.getItem('username') } </h2>
        </div>
    </div>
    <div id="avatar-container" class="avatar-container">
        <img id="avatar" src={ `https://cdn.discordapp.com/avatars/${ cookies.getItem('userid') }/${ cookies.getItem('avatar') }.png` } class="avatar" alt="" width="50px" />
        <div id="log-out-menu" class="log-out-menu log-out-menu-hide">
            <img id="log-out-pointer" class="log-out-pointer" src="log-out-pointer.png" alt="" />
            <button id="log-out-button" class="btn log-out-button" onclick="document.location.href = '/logout'">log out</button>
        </div>
    </div>
</nav>
    );
  }
}

export default Nav;
