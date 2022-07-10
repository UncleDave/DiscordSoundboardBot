import { fetchUser, postSound, skipRequest } from './requests';
import { makeSoundButtons, searchFilter } from './utils';
import Favorites from './favorites'

let userData;
const favorites = new Favorites;

document.addEventListener('DOMContentLoaded', async () => {
  userData = await fetchUser();
  makeSoundButtons(userData.soundList, favorites);
})

// Addsound

// functions randomSuccessMessage() and addSound()
// fileInput event listener
// Nameinput property, event listener
// DOCUMENT ADDSOUND CONFIRM event listener => addSound()

// Sound/Skip

document.getElementById('btn-container').addEventListener('click', e => {
  if (e.target.classList.contains('sound-btn')) {
    e.target.classList.add('btn-red');
    postSound(e.target);
    setTimeout(() => e.target.classList.remove('btn-red'), 1);
  }
  if (e.target.classList.contains('favStar')) favorites.toggleBtnAsFav(e.target);
});

document.addEventListener('click', e => {
  const logOutMenu = document.getElementById('log-out-menu');
  const avatar = document.getElementById('avatar');
  if (e.target === document.getElementById('skip-one')) skipRequest();
  if (e.target === document.getElementById('skip-all')) skipRequest(true);
  if (e.target === avatar) logOutMenu.classList.toggle('log-out-menu-hide');
  if (e.target !== avatar) logOutMenu.classList.add('log-out-menu-hide');
  if (e.target === document.getElementById('search-cancel')) searchFilter(true);
});

document.getElementById('search').addEventListener('keyup', () => searchFilter());

document.getElementById('favorites-btn')
  .addEventListener('click', e => {
    const buttons = Array.from(document.getElementById('btn-container').children);
    if (e.target.classList.contains('filter-btn-on'))
      buttons.forEach(i => i.classList.remove('btn-filter-fav'));
    else
      buttons.forEach(i => {
        if (!i.classList.contains('fav')) i.classList.add('btn-filter-fav');
      });
    e.target.classList.toggle('filter-btn-on');
  });
