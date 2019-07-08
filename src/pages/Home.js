import React, { Component } from 'react';
import Preloader from '../components/layout/Preloader';
import PlaylistItem from '../components/layout/PlaylistItem';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: null
    };
  }

  componentDidMount() {
    // If token exists then get token, otherwise route user to login
    if (localStorage.getItem('FBIdtoken')) {
      const FBIdToken = localStorage.getItem('FBIdtoken');
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      axios
        .get('/playlists')
        .then(res => {
          this.setState({
            playlists: res.data
          });
        })
        .catch(err => {
          console.error(err.response.data);
        });
    } else {
      M.toast({ html: 'Please login' });
      this.props.history.push('/login');
    }
  }

  render() {
    let recentPlaylists = this.state.playlists ? (
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>Your Playlists</h4>
        </li>
        {this.state.playlists.map(playlist => (
          <PlaylistItem playlist={playlist} key={playlist.name} />
        ))}
      </ul>
    ) : (
      <Preloader />
    );
    return recentPlaylists;
  }
}

export default Home;
