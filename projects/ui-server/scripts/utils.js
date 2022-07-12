import { addSound } from './requests';

export function makeSoundButtons(data, userFavorites) {
  data.forEach(i => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    const fav = document.createElement('span');
    fav.classList.add('material-icons', 'favStar', 'icon-btn');
    if (userFavorites.list.find(x => x === i)) {
      div.classList.add('fav');
      fav.innerHTML = 'star';
      fav.classList.add('fav-set');
    } else {
      fav.innerHTML = 'star_outline';
    }
    btn.innerHTML = i;
    btn.classList.add('btn', 'sound-btn');
    div.dataset.soundName = i;
    div.classList.add('sound-tile');
    div.appendChild(btn);
    div.appendChild(fav);
    document.getElementById('btn-container').appendChild(div);
  });
}

export function searchFilter(cancelButton = false) {
  const search = document.getElementById('search');
  if (cancelButton) search.value = '';
  search.focus();

  const searchX = document.getElementById('search-cancel');
  if (search.value) searchX.classList.add('search-cancel-show');
  else searchX.classList.remove('search-cancel-show');

  const searchMessage = document.getElementById('empty-search-container');
  searchMessage.classList.remove('message-container-show');
  const buttons = Array.from(document.getElementById('btn-container').children);
  buttons.forEach(i => i.classList.add('btn-hide'));
  buttons.forEach(i => {
    const btnName = i.dataset.soundName.toUpperCase();
    if (btnName.includes(search.value.toUpperCase())) i.classList.remove('btn-hide');
  });
  if (buttons.every(i => i.classList.contains('btn-hide'))) searchMessage.classList.add('message-container-show');
}

export function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export function addSoundLogic() {
  const addSoundButton = document.getElementById('add-sound-button');
  const addSoundDialog = document.getElementById('add-sound-dialog');
  const fileInput = document.getElementById('file-upload');
  const confirmButton = document.getElementById('addsound-confirm-btn');
  const nameInput = document.getElementById('sound-name-input');
  const dialogMessage = document.getElementById('add-sound-text');
  const defaultMessage = 'Upload a new sound file';

  addSoundButton.addEventListener('click', () => {
    if (addSoundDialog.classList.contains('btn-hide')) {
      addSoundDialog.classList.remove('btn-hide');
      return;
    }
    fileInput.value = null;
    nameInput.value = null;
    confirmButton.classList.add('btn-hide');
    addSoundDialog.classList.add('btn-hide');
  });

  fileInput.addEventListener('change', () => {
    const supportedFileTypes = ['wav', 'mp3', 'webm', 'ogg'];
    const path = fileInput.value.split('.');
    const extension = path[path.length - 1];

    if (!supportedFileTypes.includes(extension) && fileInput.value) {
      fileInput.value = null;
      addSoundDialog.classList.add('btn-red', 'add-sound-shake');
      dialogMessage.innerHTML = 'WRONG FILE TYPE (try: wav mp3 webm ogg)';
      setTimeout(() => {
        addSoundDialog.classList.remove('btn-red', 'add-sound-shake');
        dialogMessage.innerHTML = defaultMessage;
      }, 3500);
      return;
    }

    if (fileInput.value && nameInput.value) confirmButton.classList.remove('btn-hide');
    else confirmButton.classList.add('btn-hide');
  });

  nameInput.onkeydown = e => { if (e.key === 'Enter') e.target.blur(); };

  nameInput.addEventListener('keyup', () => {
    if (!fileInput.value || !nameInput.value) {
      confirmButton.classList.add('btn-hide');
      return;
    }
    if (fileInput.value && nameInput.value) confirmButton.classList.remove('btn-hide');
  });

  document.getElementById('addsound-confirm-btn').addEventListener('click', () => addSound());
}
