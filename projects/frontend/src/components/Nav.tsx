import React, { FC } from 'react';
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';

// TODO: Move user info to hook
// TODO: Log out menu

const Nav: FC = () => (
  <nav className="nav">
    <div className="nav-left">
      <div className="title-container">
        <h1>DiscordSoundboardBot</h1>
      </div>
      <div className="username-container">
        <h2 className="username" id="username">
          { cookies.get('username') }
        </h2>
      </div>
    </div>
    <div id="avatar-container" className="avatar-container">
      <img id="avatar" src={ `https://cdn.discordapp.com/avatars/${ cookies.get('userid') }/${ cookies.get('avatar') }.png` } className="avatar" alt="" width="50px" />
      <div id="log-out-menu" className="log-out-menu log-out-menu-hide">
        <img id="log-out-pointer" className="log-out-pointer" src="log-out-pointer.png" alt="" />
        <Link to="/logout">
          <button id="log-out-button" type="button" className="btn log-out-button">log out</button>
        </Link>
      </div>
    </div>
  </nav>
);

export default Nav;
