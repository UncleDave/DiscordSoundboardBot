import React, { FC } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import useUser from '../hooks/use-user';
import LogoutMenu from './LogoutMenu';

interface NavProps {
  showLogoutMenu: boolean;
  setShowLogoutMenu: (show: boolean) => void;
}

const Nav: FC<NavProps> = ({ showLogoutMenu, setShowLogoutMenu }) => {
  const user = useUser();
  const ref = useDetectClickOutside({ onTriggered: () => { if (showLogoutMenu) setShowLogoutMenu(false); } });

  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="title-container">
          <h1>DiscordSoundboardBot</h1>
        </div>
        <div className="username-container">
          <h2 className="username">
            { user.name }
          </h2>
        </div>
      </div>
      <div className="avatar-container">
        <img
          ref={ ref }
          src={ `https://cdn.discordapp.com/avatars/${ user.id }/${ user.avatarId }.png` }
          className="avatar"
          alt=""
          width="50px"
          role="presentation"
          onClick={ () => setShowLogoutMenu(!showLogoutMenu) }
        />
        { showLogoutMenu ? <LogoutMenu /> : null }
      </div>
    </nav>
  );
};

export default Nav;
