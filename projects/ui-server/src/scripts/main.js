import Cookies from 'js-cookies';
import { makeSoundButtons, searchFilter } from './utils';
import Favorites from './favorites';
import './sound-playback';
import './addsound';

async function getSounds() {
  try {
    const soundsResponse = await fetch('/api/soundlist');
    const soundList = await soundsResponse.json();
    return soundList;
  } catch (error) {
    console.error(error);
    document.getElementById('body').classList.add('body-error');
    document.getElementById('error-container').classList.add('message-container-show');
    document.getElementById('search-container').classList.add('search-hide');
  }
  return null;
}

const favorites = new Favorites();

document.addEventListener('DOMContentLoaded', async () => {
  const soundList = await getSounds();
  document.getElementById('username').innerHTML = Cookies.getItem('username');
  document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${ Cookies.getItem('userid') }/${ Cookies.getItem('avatar') }.png`;
  makeSoundButtons(soundList, favorites);
});

document.addEventListener('click', e => {
  const logOutMenu = document.getElementById('log-out-menu');
  const avatar = document.getElementById('avatar');
  if (e.target === avatar) logOutMenu.classList.toggle('log-out-menu-hide');
  if (e.target !== avatar) logOutMenu.classList.add('log-out-menu-hide');
  if (e.target === document.getElementById('search-cancel')) searchFilter(true);
});

document.getElementById('search').addEventListener('keyup', () => searchFilter());
