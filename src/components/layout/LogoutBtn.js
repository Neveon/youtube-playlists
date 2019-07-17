import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const LogoutBtn = () => {
  const handleLogout = () => {
    localStorage.clear();
    M.toast({ html: 'Logging out...' });
    setTimeout(() => {
      window.location.href = '/login';
    }, 1100);
  };

  return (
    <a
      className='waves-effect waves-light btn-small'
      href='#!'
      onClick={handleLogout}
    >
      <b id='logoutTitle'>Logout</b>
      <i className='material-icons left'>backspace</i>
    </a>
  );
};

export default LogoutBtn;
