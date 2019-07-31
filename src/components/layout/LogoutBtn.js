import React from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

const LogoutBtn = props => {
  const handleLogout = () => {
    props.logoutUser();
    M.toast({ html: 'Logging out...' });
  };

  return (
    <a
      className='waves-effect waves-light btn-small'
      href={props.atHome ? '/login' : '#!'}
      onClick={handleLogout}
    >
      <b id='logoutTitle'>Logout</b>
      <i className='material-icons left'>backspace</i>
    </a>
  );
};

LogoutBtn.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(LogoutBtn);
