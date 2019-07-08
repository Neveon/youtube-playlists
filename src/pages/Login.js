import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';

const Login = props => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    loading: false
  });

  const onSubmit = e => {
    e.preventDefault();
    setForm({ ...form, loading: true });

    const userData = {
      email: form.email,
      password: form.password
    };

    localStorage.clear();

    axios
      .post('/login', userData)
      .then(res => {
        const FBIdToken = `Bearer ${res.data.token}`; // FBAuth response
        localStorage.setItem('FBIdtoken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        M.toast({ html: 'Login Successful' });
        props.history.push('/');
      })
      .catch(err => {
        if (err.response.data.email) {
          M.toast({ html: 'Please enter a valid email' });
        }
        if (err.response.data.password) {
          M.toast({ html: 'Please enter a valid password' });
        }
        if (err.response.data.general) {
          M.toast({ html: 'Wrong Credentials' });
        }
        setForm({ ...form, loading: false });
      });
  };

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
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
          disabled={form.loading}
        >
          Login
          <i className='material-icons right'>send</i>
        </button>
        <br />
        <br />
        <small>
          Don't have an account? <Link to='/signup'>Sign up here</Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
