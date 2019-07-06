import React, { Component } from 'react';
import YouTube from 'react-youtube';

class ReactYouTubeExample extends Component {
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
  videoOnPlay(event) {
    // access to player in all event handlers via event.target
    // event.target.playVideoAt(50) // 50 seconds
    const player = event.target;
    /// console.log(player.getCurrentTime())
  }
  videoStateChange(event) {
    const player = event.target;
    console.log(player.getCurrentTime());
  }

  componentWillUnmount() {
    const { playerObj } = this.state;
    //console.log(player.getCurrentTime());
  }

  onPlayerReady(event) {
    event.target.loadPlaylist(['20Ov0cDPZy8', 'dBFW8OvciIU']);
  }

  // onPlayerStateChange(event) {
  //   if (event.data == YT.PlayerState.PLAYING && !done) {
  //     // setTimeout(stopVideo, 60000);
  //     done = true;
  //   }
  // }

  render() {
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
    const { videoId } = this.props;
    return (
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={this.onPlayerReady}
        onPlay={this.videoOnPlay}
        onStateChange={this.videoStateChange}
      />
    );
  }
}

export default ReactYouTubeExample;
