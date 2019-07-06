import React, { Component } from 'react';

export class AddVideoModal extends Component {
  render() {
    return (
      <div>
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

export default AddVideoModal;
