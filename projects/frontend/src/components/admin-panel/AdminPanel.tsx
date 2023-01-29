import React, { FC, useState } from 'react';
import { SWRResponse } from 'swr';
import styled from 'styled-components';
import Sound from '../../models/sound';
import SearchContainer from '../features/SearchContainer';
import PanelSound from './PanelSound';

const AdminPanelMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const AdminFeatures = styled.div`
  padding: 20px 30px;
  box-shadow: 0px 5px 5px 2px ${ props => props.theme.colors.shadowDefault };

  > h2 {
    color: ${ props => props.theme.colors.borderDefault }
  }
`;

const LowerContainer = styled.div`
  display: flex;
  overflow-y: hidden;

  > div {
    width: 50%;
  }
`;

const SoundsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px 30px;
  border-right: 5px solid ${ props => props.theme.colors.borderDefault };

  &::-webkit-scrollbar {
    width: 10px;
    background: ${ props => props.theme.colors.innerB };
  }

  &::-webkit-scrollbar-thumb {
    background: ${ props => props.theme.colors.innerA };
  }
`;

const ActionsContainer = styled.div`
`;

interface AdminPanelProps {
  sounds: SWRResponse<Sound[], any, any>;
}

const AdminPanel: FC<AdminPanelProps> = ({ sounds: { data: sounds, error } }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (sounds)
    return (
      <AdminPanelMain>
        <AdminFeatures>
          <h2>TOP SECRET ADMIN ZONE</h2>
          <SearchContainer setSearchTerm={ setSearchTerm } />
        </AdminFeatures>
        <LowerContainer>
          <SoundsContainer>
            { sounds.map(x => {
              if (searchTerm && !x.name.toUpperCase().includes(searchTerm)) return null;
              return (<PanelSound key={ x.id } sound={ x } />);
            })}
          </SoundsContainer>
          <ActionsContainer>Hi</ActionsContainer>
        </LowerContainer>
      </AdminPanelMain>
    );
  return (
    <AdminPanelMain>
      { error ? <h1>Something broke eeeeeek</h1> : <h1>Loading yo sounds...</h1> }
    </AdminPanelMain>
  );
};

export default AdminPanel;
