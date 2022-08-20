import React from 'react';

class SoundTile extends React.Component {
  render() {
    return (
      <div key={ this.props.id } data-id={ this.props.id } data-sound-name={ this.props.name }
        className={ `${ this.props.fav ? 'fav ' : '' }sound-tile`}>
          <button className="btn sound-btn">{ this.props.name }</button>
          <span className={ `material-icons favStar icon-btn ${ this.props.fav ? 'fav-set' : '' }` }>{ this.props.fav ? 'star' : 'star_outline'}</span>
      </div>
    );
  }
}

export default SoundTile;
