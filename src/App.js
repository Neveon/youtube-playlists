import React, { useEffect } from 'react';
import ReactYouTubeExample from './components/ReactYoutube';
import AddVideoBtn from './components/layout/AddVideoBtn';
import AddVideoModal from './components/layout/AddVideoModal';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <div>
      <div className='App'>
        <AddVideoBtn />
        <ReactYouTubeExample videoId='_nBlN9yp9R8' />
      </div>
      <AddVideoModal />
    </div>
  );
};

export default App;
