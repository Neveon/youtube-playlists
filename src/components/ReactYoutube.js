import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ReactYouTubeExample = ({ current }) => {
  const playlist = current.list;

  useEffect(() => {
    // Update every time list is updated
  }, [current.list]);
  // videoOnReady(event) {
  //   // access to player in all event handlers via event.target
  //   // event.target.playVideoAt(50) // 50 seconds
  //   const player = event.target;
  //   this.setState({
  //     playerObj: player
  //   });
  //   player.seekTo(50);
  //   console.log(event.target);
  // }
  // const videoOnPlay = event => {
  //   // access to player in all event handlers via event.target
  //   // event.target.playVideoAt(50) // 50 seconds
  //   const player = event.target;
  //   //console.log(player.getCurrentTime());
  // };
  // const videoStateChange = event => {
  //   const player = event.target;
  //   //console.log(player.getCurrentTime());
  // };

  // When changning page, saves where player left off
  // Can useEffect with return function to mimic componentWillUnmount
  // componentWillUnmount() {
  //   const { playerObj } = this.state;
  //   //console.log(player.getCurrentTime());
  // }

  const onPlayerReady = event => {
    const player = event.target;
    player.loadPlaylist(playlist);
  };

  let height = window.innerHeight / 2.25;
  let width = window.innerWidth / 1.25;

  const opts = {
    height: height.toString(),
    width: width.toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      rel: 0,
      showinfo: 0
    },
    loadPlaylist: {
      listType: 'playlist',
      list: playlist,
      index: parseInt(0),
      suggestedQuality: 'default'
    }
  };
  // const { videoId } = props;
  return (
    <div>
      <YouTube
        // videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        // onPlay={videoOnPlay}
        // onStateChange={videoStateChange}
      />
    </div>
  );
};

ReactYouTubeExample.propTypes = {
  current: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  current: state.playlist.current
});

export default connect(mapStateToProps)(ReactYouTubeExample);
