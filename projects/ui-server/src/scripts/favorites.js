export default class Favorites {
  constructor() {
    this.addListeners();
  }
  addListeners() {
    document.getElementById('favorites-btn').addEventListener('click', e => {
      const buttons = Array.from(document.getElementById('btn-container').children);
      if (e.target.classList.contains('filter-btn-on')) buttons.forEach(i => i.classList.remove('btn-filter-fav'));
      else buttons.forEach(i => { if (!i.classList.contains('fav')) i.classList.add('btn-filter-fav'); });
      e.target.classList.toggle('filter-btn-on');
    });
    document.getElementById('btn-container').addEventListener('click', e => { if (e.target.classList.contains('favStar')) this.toggleBtnAsFav(e.target); });
  }
  async export() {
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.list),
    });
  }
  async update(soundId, remove = false) {
    await fetch('/api/favorites', {
      method: remove ? 'DELETE' : 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: soundId,
    });
  }
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
  }
}
