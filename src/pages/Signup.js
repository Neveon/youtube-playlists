import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';

const Signup = props => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    loading: false
  });

  const onSubmit = e => {
    e.preventDefault();
    setForm({ ...form, loading: true });

    const userData = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      username: form.username
    };
    axios
      .post('/signup', userData)
      .then(res => {
        const FBIdToken = `Bearer ${res.data.token}`; // FBAuth response
        localStorage.setItem('FBIdtoken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        M.toast({ html: 'Sign up Successful' });
        props.history.push('/');
        setForm({ ...form, loading: false });
      })
      .catch(err => {
        if (err.response.data.email) {
          M.toast({ html: `Email: ${err.response.data.email}` });
        }
        if (err.response.data.password) {
          M.toast({ html: `Password: ${err.response.data.password}` });
        }
        if (err.response.data.confirmPassword) {
          M.toast({
            html: `Confirm Password: ${err.response.data.confirmPassword}`
          });
        }
        if (err.response.data.username) {
          M.toast({ html: `Username: ${err.response.data.username}` });
        }
        setForm({ ...form, loading: false });
      });
  };

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className='row center-align'>
        <h1 className='text-center'>Sign up</h1>
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
          <div className='row'>
            <div className='input-field col s12'>
              <input
                value={form.confirmPassword}
                onChange={onChange}
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                className='validate'
              />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                value={form.username}
                onChange={onChange}
                type='text'
                name='username'
                id='username'
                className='validate'
              />
              <label htmlFor='username'>Username</label>
            </div>
          </div>

          <button
            className='btn waves-effect waves-light'
            type='submit'
            disabled={form.loading}
          >
            Signup
            <i className='material-icons right'>send</i>
          </button>
          <br />
          <br />
          <small>
            Already have an account? <Link to='login'>Sign in here</Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Signup;
