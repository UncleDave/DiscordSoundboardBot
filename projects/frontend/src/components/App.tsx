import React, { FC } from 'react';
import './App.css';
import SWRProvider from '../providers/SWRProvider';
import Nav from './Nav';
import Features from './Features';
import ButtonContainer from './ButtonContainer';

const App: FC = () => (
  <div className="App">
    <SWRProvider>
      <Nav />
      <Features />
      <ButtonContainer />
    </SWRProvider>
  </div>
);

export default App;
