import React, { FC, useState } from 'react';
import { SWRResponse } from 'swr';
import styled from 'styled-components';
import Sound from '../../models/sound';
import SearchContainer from '../features/SearchContainer';
import PanelSound from './PanelSound';
import PanelInfoContainer from './PanelInfoContainer';
import { textShadowVisibility } from '../../styles/mixins';

const AdminPanelMain = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: hidden;
  background-color: ${ props => props.theme.colors.bg };
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
  flex-grow: 1;
`;

const SoundsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px 30px;
  border-right: 5px solid ${ props => props.theme.colors.borderDefault };

  > h2 {
    color: ${ props => props.theme.colors.borderDefault };
    margin: 5px 0px;
    
    ${ textShadowVisibility }
  }

  &::-webkit-scrollbar {
    width: 10px;
    background: ${ props => props.theme.colors.innerB };
  }

  &::-webkit-scrollbar-thumb {
    background: ${ props => props.theme.colors.innerA };
  }
`;

interface AdminPanelProps {
  sounds: SWRResponse<Sound[], any, any>;
  previewRequest: (soundName: string) => Promise<void>
}

const AdminPanel: FC<AdminPanelProps> = ({ sounds: { data: sounds, error }, previewRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);

  if (sounds)
    return (
      <AdminPanelMain>
        <AdminFeatures>
          <h2>TOP SECRET ADMIN ZONE</h2>
          <SearchContainer setSearchTerm={ setSearchTerm } />
        </AdminFeatures>
        <LowerContainer>
          <SoundsContainer>
            <h2>Select a sound for info/delete/rename</h2>
            { sounds.map(x => {
              if (searchTerm && !x.name.toUpperCase().includes(searchTerm)) return null;
              return (<PanelSound key={ x.id } sound={ x } selectedSoundId={ selectedSound?.id } setSelectedSound={ setSelectedSound } previewRequest={ previewRequest } />);
            })}
          </SoundsContainer>
          <PanelInfoContainer selectedSound={ selectedSound } setSelectedSound={ setSelectedSound } previewRequest={ previewRequest } />
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
