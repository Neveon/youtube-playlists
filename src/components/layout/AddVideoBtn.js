import React, { Component } from 'react';

class AddVideoBtn extends Component {
  render() {
    return (
      <div>
        <a href='#modal' className='waves-effect waves-light btn modal-trigger'>
          Add Video to Playlist
        </a>

        <div id='modal' className='modal bottom-sheet'>
          <div className='modal-content'>
            <h4>Add a Video</h4>
            <p>Text for modal</p>
          </div>
          <div className='modal-footer'>
            <a
              href='#!'
              className='modal-close waves-effect waves-green btn-flat'
            >
              Close
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AddVideoBtn;
