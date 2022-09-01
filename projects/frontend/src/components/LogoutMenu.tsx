import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoutPointer from './LogoutPointer';

const LogoutMenu: FC = () => (
  <div id="log-out-menu" className="log-out-menu">
    <LogoutPointer />
    <Link to="/logout">
      <button id="log-out-button" type="button" className="btn log-out-button">log out</button>
    </Link>
  </div>

);

export default LogoutMenu;
