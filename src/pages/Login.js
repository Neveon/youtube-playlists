import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';

// Image
import ExploreImage from '../assets/music-collection.jpg';

const Login = ({ loginUser, user: { loading }, history }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: form.email,
      password: form.password
    };
    loginUser(userData, history);
  };

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className='row'>
      <Link to='/explore'>
        <div className='col s12 m6'>
          <div id='exploreContainer'>
            <img src={ExploreImage} alt='Explore' className='responsive-img' />
            <p id='exploreTitle' className='flow-text'>
              Explore Playlists
            </p>
            <i className='material-icons white-text pulse' id='exploreIcon'>
              explore
            </i>
            <br />
            <div id='exploreContent' className='center-align'>
              <p>
                All playlists are unlisted and available publicly to explore.
                <br />
                <br />
                You can create your own playlist here or explore to check out
                what playlists are out there.
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className='col s12 m6'>
        <div className='row center-align'>
          <h1 className='text-center'>Login</h1>
          <form className='col s12' onSubmit={onSubmit}>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  value={form.email}
                  onChange={onChange}
                  type='text'
                  name='email'
                  id='email'
                  className='validate'
                />
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  value={form.password}
                  onChange={onChange}
                  type='password'
                  name='password'
                  id='password'
                  className='validate'
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>

            <button
              className='btn waves-effect waves-light'
              type='submit'
              disabled={loading}
            >
              Login
              <i className='material-icons right'>send</i>
            </button>
            <br />
            <br />
            {loading ? (
              <div className='preloader-wrapper small active'>
                <div className='spinner-layer spinner-green-only'>
                  <div className='circle-clipper left'>
                    <div className='circle' />
                  </div>
                  <div className='gap-patch'>
                    <div className='circle' />
                  </div>
                  <div className='circle-clipper right'>
                    <div className='circle' />
                  </div>
                </div>
              </div>
            ) : null}
            <br />
            <br />
            <small>
              Don't have an account? <Link to='/signup'>Sign up here</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
