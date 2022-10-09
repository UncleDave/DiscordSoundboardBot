import React, { FC, useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';

function randomSuccessMessage() {
  const messages = ['The cloud awaits...', 'sv_gravity -800', 'Maybe you\'re actually falling tho.', 'ZOOM', 'TO THE SKY REALM',
    'SOUNDS FOR THE SOUND GOD', 'NOOOOO THIS FILE IS FULL OF HELIUM'];
  return messages[Math.floor(Math.random() * messages.length)];
}

const defaultMessage = 'Upload a new sound file';

interface AddSoundDialogProps {
  setShowAddsound: (show: boolean) => void;
  setDisableAddSoundButton: (disable: boolean) => void;
}

const AddSoundDialog: FC<AddSoundDialogProps> = ({ setShowAddsound, setDisableAddSoundButton }) => {
  const [message, setMessage] = useState(defaultMessage);
  const [addSoundStyle, setAddSoundStyle] = useState('');
  const [fileInputValue, setFileInputValue] = useState('');
  const [fileInputFiles, setFileInputFiles] = useState<FileList | null>(null);
  const [nameInputValue, setNameInputValue] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [disableInputs, setDisableInputs] = useState(false);

  const { mutate } = useSWRConfig();

  const addSound = useCallback(async () => {
    if (!fileInputValue) return;
    const formData = new FormData();
    if (nameInputValue) formData.append('custom-name', nameInputValue);
    if (fileInputFiles) formData.append('sound-file', fileInputFiles[0]);

    try {
      setShowConfirm(false);
      const addSoundRes = await fetch('/api/addsound', {
        method: 'POST',
        body: formData,
      });
      if (addSoundRes.status === 409) throw new Error('Sound already exists');
      setDisableAddSoundButton(true);
      setMessage(randomSuccessMessage());
      setAddSoundStyle(' add-sound-displace btn-green');
      setDisableInputs(true);
      await mutate('/api/sounds');
      setTimeout(() => {
        setShowAddsound(false);
        setFileInputValue('');
        setNameInputValue('');
        setFileInputFiles(null);
        setDisableInputs(false);
        setMessage(defaultMessage);
        setAddSoundStyle('');
        setDisableAddSoundButton(false);
      }, 2100);
    } catch (error: any) {
      setAddSoundStyle(' btn-red add-sound-shake');
      if (error.message === 'Sound already exists') setMessage('Whoops, a sound already has that name');
      else setMessage('Yikes! Something went wrong');
      setTimeout(() => {
        setAddSoundStyle('');
        setMessage(defaultMessage);
      }, 3500);
    }
  }, [fileInputValue, nameInputValue]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const supportedFileTypes = ['wav', 'mp3', 'webm', 'ogg'];
    const path = event.target.value.split('.');
    const extension = path[path.length - 1].toLowerCase();

    if (!supportedFileTypes.includes(extension) && event.target.value) {
      event.target.value = '';
      setFileInputValue('');
      setShowConfirm(false);
      setAddSoundStyle(' btn-red add-sound-shake');
      setMessage('WRONG FILE TYPE (try: wav mp3 webm ogg)');
      setTimeout(() => {
        setAddSoundStyle('');
        setMessage('Upload a new sound file');
      }, 3500);
      return;
    }

    setFileInputValue(event.target.value);
    setFileInputFiles(event.target.files);
    if (event.target.value && nameInputValue) setShowConfirm(true);
    else setShowConfirm(false);
  }, [nameInputValue]);

  const handleNameInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(event.target.value);
    if (!fileInputValue || !event.target.value) {
      setShowConfirm(false);
      return;
    }
    if (fileInputValue && event.target.value) setShowConfirm(true);
  }, [fileInputValue]);

  return (
    <div className={ `add-sound-dialog${ addSoundStyle }` }>
      <h4 className='add-sound-text'>{ message }</h4>
      <input
        type="file"
        accept=".wav, .mp3, .webm, .ogg"
        className="file-upload text-input add-sound-input"
        value={ fileInputValue }
        disabled={ disableInputs }
        onChange={ event => handleFileInputChange(event) }
      />
      <input
        type="text"
        name=""
        placeholder="Enter a name for the sound"
        enterKeyHint="done"
        className="add-sound-input text-input"
        value={ nameInputValue }
        onChange={ event => handleNameInputChange(event) }
        disabled={ disableInputs }
        onKeyDown={ e => { if (e.key === 'Enter') e.currentTarget.blur(); } }
      />
      { showConfirm
        ? (
          <button
            type="submit"
            className="btn filter-btn add-sound-button"
            onClick={ addSound }
          >
            Go!
          </button>
        )
        : null }
    </div>
  );
};

export default AddSoundDialog;
