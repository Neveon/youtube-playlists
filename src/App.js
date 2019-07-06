import React, { useEffect } from 'react';
import ReactYouTubeExample from './components/ReactYoutube';
import AddVideoBtn from './components/layout/AddVideoBtn';

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
      <AddVideoBtn />
      <ReactYouTubeExample videoId='_nBlN9yp9R8' />
    </div>
  );
};

export default App;
