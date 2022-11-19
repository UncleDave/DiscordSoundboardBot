import React, { FC, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/use-user';
import AvatarContainer from './AvatarContainer';
import ChristmasLights from '../decorative/ChristmasLights';

const NavMain = styled.div`
  background-color: ${ props => props.theme.colors.nav };
  box-shadow: 0px 5px 5px 2px ${ props => props.theme.colors.shadowDefault };
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;

  z-index: 1;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-left: 20px;

  @media only screen and (max-width: 780px) {
    flex-direction: column;
  }   
`;

const Title = styled.div`
  > h1 {
    font-size: 2rem;
    text-shadow: 0px 3px 3px ${ props => props.theme.colors.shadowDefault };
    z-index: 1;
  
    ${ props => props.theme.name === 'christmas' ? 'filter: brightness(1.3);' : '' }
  }
  
  @media only screen and (max-width: 780px) {
    max-height: 20px;
  }
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;

  @media only screen and (max-width: 780px) {
    margin-top: 14px;
    width: 100%
  }

  > h2 {
    font-size: 1.5rem;
    color: white;
    text-shadow: 0px 3px 3px ${ props => props.theme.colors.shadowDefault };

    z-index: 1;
  }
`;

function getTitleFromDate(date: string) {
  if (date.includes('Oct')) return 'DiscordSpookboardBot';
  if (date.includes('Nov')) return 'DiscordSoundboardClaus';
  return 'DiscordSoundboardBot';
}

interface NavProps {
  systemDate: string;
}

const Nav: FC<NavProps> = ({ systemDate }) => {
  const user = useUser();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  return (
    <NavMain>
      { systemDate.includes('Nov') ? <ChristmasLights /> : null }
      <NavLeft>
        <Title>
          <h1>{ getTitleFromDate(systemDate) }</h1>
        </Title>
        <Username>
          <h2>
            { user.name }
          </h2>
        </Username>
      </NavLeft>
      <AvatarContainer showLogoutMenu={ showLogoutMenu } setShowLogoutMenu={ setShowLogoutMenu } />
    </NavMain>
  );
};

export default Nav;
