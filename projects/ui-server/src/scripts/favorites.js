const favorites = {
  constructor() {
    this.addListeners();
  },
  addListeners() {
    document.getElementById('favorites-btn').addEventListener('click', e => {
      const buttons = Array.from(document.getElementById('btn-container').children);
      if (e.target.classList.contains('filter-btn-on')) buttons.forEach(i => i.classList.remove('btn-filter-fav'));
      else buttons.forEach(i => { if (!i.classList.contains('fav')) i.classList.add('btn-filter-fav'); });
      e.target.classList.toggle('filter-btn-on');
    });
    document.getElementById('btn-container').addEventListener('click', e => { if (e.target.classList.contains('favStar')) this.toggleBtnAsFav(e.target); });
  },
  async update(soundId, remove = false) {
    await fetch(`/api/favorites/${ soundId }`, {
      method: remove ? 'DELETE' : 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  toggleBtnAsFav(favStar) {
    const soundData = favStar.parentElement.dataset;
    if (favStar.classList.contains('fav-set')) {
      favStar.innerHTML = 'star_outline';
      this.update(soundData.id, true);
    } else {
      favStar.innerHTML = 'star';
      this.update(soundData.id);
    }
    favStar.classList.toggle('fav-set');
    favStar.parentElement.classList.toggle('fav');
  },
};

favorites.addListeners();

export default favorites;
