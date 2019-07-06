import React, { Component } from 'react';
import YouTube from 'react-youtube';

const ReactYouTubeExample = props => {
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
  const videoOnPlay = event => {
    // access to player in all event handlers via event.target
    // event.target.playVideoAt(50) // 50 seconds
    const player = event.target;
    console.log(player.getCurrentTime());
  };
  const videoStateChange = event => {
    const player = event.target;
    console.log(player.getCurrentTime());
  };

  // When changning page, saves where player left off
  // Can useEffect with return function to mimic componentWillUnmount
  // componentWillUnmount() {
  //   const { playerObj } = this.state;
  //   //console.log(player.getCurrentTime());
  // }

  const onPlayerReady = event => {
    const player = event.target;
    player.loadPlaylist(['20Ov0cDPZy8', 'dBFW8OvciIU']);
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      rel: 0,
      showinfo: 0
    },
    loadPlaylist: {
      listType: 'playlist',
      list: ['20Ov0cDPZy8', 'dBFW8OvciIU'],
      index: parseInt(0),
      suggestedQuality: 'default'
    }
  };
  const { videoId } = props;
  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={onPlayerReady}
      onPlay={videoOnPlay}
      onStateChange={videoStateChange}
    />
  );
};

export default ReactYouTubeExample;
