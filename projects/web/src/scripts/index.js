import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { searchFilter } from './utils';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

document.addEventListener('DOMContentLoaded', async () => {
  import('./favorites');
  import('./sound-playback');
  import('./addsound');
  // try {
  //   const soundsRes = await fetch('/api/soundlist');
  //   const data = await soundsRes.json();
  //   loadSoundData(data);
  // } catch (error) {
  //   console.error(error);
  //   document.body.classList.add('body-error');
  //   document.getElementById('error-container').classList.add('message-container-show');
  //   document.getElementById('search-container').classList.add('search-hide');
  // }
  document.getElementById('search').addEventListener('keyup', () => searchFilter());

  document.getElementById('size-toggle-btn').addEventListener('click', () =>
    document.getElementById('btn-container').classList.toggle('btn-container-scale'));
});

document.addEventListener('click', e => {
  const logOutMenu = document.getElementById('log-out-menu');
  const avatar = document.getElementById('avatar');
  if (e.target === avatar) logOutMenu.classList.toggle('log-out-menu-hide');
  if (e.target !== avatar) logOutMenu.classList.add('log-out-menu-hide');
  if (e.target === document.getElementById('search-cancel')) searchFilter(true);
});
