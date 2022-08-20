import React from 'react';
import SoundTile from './Sound-Tile';

class ButtonContainer extends React.Component {
  state = { buttons: 'Loading Sounds...' };

  async componentDidMount() {
    try {
      const soundsRes = await fetch('/api/soundlist');
      const data = await soundsRes.json();
      const buttons = [];
      data.soundList.forEach(i => {
        const soundButton = this.renderSoundTile(i.id, i.name, data.favorites.find(x => x === i.id));
        buttons.push(soundButton);
      });
      this.setState({ buttons });
    } catch (error) {
      console.log(error);
    }
  }

  renderSoundTile(id, name, fav) {
    return (
      <SoundTile key={ id } id={ id } name={ name } fav={ fav } />
    );
  }

  render() {
    return (
      <div id="btn-container" className="btn-container btn-container-show">{ this.state.buttons }</div>
    );
  }
}

export default ButtonContainer;
