export default class Favorites {
  constructor() {
    this.load();
  }
  list = [];
  save() {
    window.localStorage.setItem('favorites', JSON.stringify(this.list));
  };
  load() {
    const stored = JSON.parse(window.localStorage.getItem('favorites'));
    if (stored) this.list = stored;
  };
  remove(soundName) {
    this.list = this.list.filter(i => i !== soundName);
  };
  toggleBtnAsFav(favStar) {
    const star = favStar;
    if (star.classList.contains('fav-set')) {
      star.innerHTML = 'star_outline';
      this.remove(star.parentElement.dataset.soundName);
    } else {
      star.innerHTML = 'star';
      this.list.push(star.parentElement.dataset.soundName);
    }
    star.classList.toggle('fav-set');
    star.parentElement.classList.toggle('fav');
    this.save();
  };
};