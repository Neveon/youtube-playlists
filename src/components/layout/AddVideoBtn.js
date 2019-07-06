import React, { Component } from 'react';

class AddVideoBtn extends Component {
  render() {
    return (
      <div>
        <a href='#modal' className='waves-effect waves-light btn modal-trigger'>
          Add Video to Playlist
        </a>
      </div>
    );
  }
}

export default AddVideoBtn;
