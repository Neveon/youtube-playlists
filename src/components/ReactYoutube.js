import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

const ReactYouTubeExample = props => {
  const playlist = [];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/playlists/John');
      const data = await res.json();
      for (let v in data.list) {
        playlist.push(data.list[v]);
      }
    };
    fetchData();
    // const data = await res.json();
    // playlist.push(data);
    //eslint-disable-next-line
  }, []);
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
    player.loadPlaylist(playlist);
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
      list: playlist,
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
