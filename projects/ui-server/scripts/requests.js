import { debounce } from './utils';

export async function fetchUser() {
  try{ 
    const userResponse = await fetch('/api/user');
    const userData = await userResponse.json();
    document.getElementById('username').innerHTML = userData.name;
    document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${ userData.userID }/${ userData.avatar }.png`;
    return userData;
  } catch (error) {
    console.error(error);
    document.getElementById('body').classList.add('body-error');
    document.getElementById('error-container').classList.add('message-container-show');
    document.getElementById('search-container').classList.add('search-hide');
    return;
  }
}

export const postSound = debounce(soundButton => {
  fetch('/api/sound', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: soundButton.parentElement.dataset.soundName,
  })
    .then(res => {
      if (res.status === 401) window.location.reload();
    })
    .catch(error => console.log(error));
  soundButton.classList.remove('btn-red');
  soundButton.classList.add('btn-green');
  setTimeout(() => soundButton.classList.remove('btn-green'), 1);
}, 2000, true);

export const skipRequest = debounce(async (all = false) => {
  await fetch(`/api/skip?skipAll=${ all }`, { headers: { 'Content-Type': 'text/plain' } })
    .then(res => {
      if (res.status === 401) window.location.reload();
    })
    .catch(error => console.log(error));
}, 500, true);

const addSoundButton = document.getElementById('add-sound-button');
const addSoundDialog = document.getElementById('add-sound-dialog');
const fileInput = document.getElementById('file-upload');
const confirmButton = document.getElementById('addsound-confirm-btn');
const nameInput = document.getElementById('sound-name-input');
const dialogMessage = document.getElementById('add-sound-text');
const defaultMessage = 'Upload a new sound file';

function randomSuccessMessage() {
  const messages = ['The cloud awaits...', 'sv_gravity -800', 'Maybe you\'re actually falling tho.', 'ZOOM', 'TO THE SKY REALM',
    'SOUNDS FOR THE SOUND GOD', 'NOOOOO THIS FILE IS FULL OF HELIUM'];
  return messages[Math.floor(Math.random() * messages.length)];
}

export async function addSound() {
  if (!fileInput.value) return;
  const formData = new FormData();
  if (nameInput.value) formData.append('custom-name', nameInput.value);
  formData.append('sound-file', fileInput.files[0]);

  try {
    confirmButton.classList.add('btn-hide');
    const addSoundRes = await fetch('/api/addsound', {
      method: 'POST',
      body: formData,
    });
    if (addSoundRes.status === 409) throw new Error('Sound already exists', { cause: 409 });
    addSoundButton.disabled = true;
    addSoundButton.classList.add('btn-green');
    addSoundButton.classList.remove('btn');
    dialogMessage.innerHTML = randomSuccessMessage();
    addSoundDialog.classList.add('add-sound-displace', 'btn-green');
    fileInput.disabled = true;
    nameInput.disabled = true;
    setTimeout(() => {
      addSoundButton.classList.remove('btn-green');
      addSoundButton.classList.add('btn');
      fileInput.value = null;
      nameInput.value = null;
      fileInput.disabled = false;
      nameInput.disabled = false;
      dialogMessage.innerHTML = defaultMessage;
      addSoundDialog.classList.add('btn-hide');
      addSoundDialog.classList.remove('add-sound-displace', 'btn-green');
      addSoundButton.disabled = false;
    }, 2100);
  } catch (error) {
    console.log(error);
    addSoundDialog.classList.add('btn-red', 'add-sound-shake');
    if (error.cause === 409) dialogMessage.innerHTML = 'Whoops, a sound already has that name';
    else dialogMessage.innerHTML = 'Yikes! Something went wrong';
    setTimeout(() => {
      addSoundDialog.classList.remove('btn-red', 'add-sound-shake');
      dialogMessage.innerHTML = defaultMessage;
      confirmButton.classList.remove('btn-hide');
    }, 3500);
  }
}
