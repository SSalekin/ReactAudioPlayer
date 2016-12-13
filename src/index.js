import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { player: false };
  }

  componentDidMount() {
    let player = document.getElementById('player');

    player.addEventListener('play',
      (e) => {
        e.preventDefault();
        this.playLocation();
      }
    );

    player.addEventListener('pause',
      (e) => {
        e.preventDefault();
        this.pause();
      }
    );

    player.addEventListener('ended',
      (e) => {
        e.preventDefault();
        this.ended();
      }
    );

    document.addEventListener('keydown', (e) => {
      let player = this.state.player;
      if (e.keyCode === 39) {
        player.currentTime += 1;
        this.setState({
          player: player
        });
      } else if (e.keyCode === 37) {
        player.currentTime -= 1;
        this.setState({
          player: player
        });
      } else if (e.keyCode === 32 && this.state.player.paused === true) {
        e.preventDefault();
        this.state.player.play();
      }  else if (e.keyCode === 32 && this.state.player.paused === false) {
        e.preventDefault();
        this.state.player.pause()
      }
    });
  }

  componentWillUnmount() {
    let player = document.getElementById(this.props.id);

    player.removeEventListener('play');
    player.removeEventListener('pause');
    player.removeEventListener('wheel');

    document.removeEventListener('keydown');
  }

  getPlaybackTime(time) {
    // eslint-disable-next-line
    let hours = Math.floor(time / 3600);

    let minutes = Math.floor(time / 60);
    if (minutes > 59) {
      minutes = Math.floor(time / 60) - 60;
    }

    let seconds = Math.round(time - minutes * 60);
    if (seconds > 3599) {
      seconds = Math.round(time - minutes * 60) - 3600;
    }

    return time;
  }

  playLocation() {
    this.setState({player: document.getElementById('player')}, function() {
      let playbackTime = this.getPlaybackTime(this.state.player.currentTime);
      playbackTime = localStorage.getItem('codepenReactPlayer');

      if (playbackTime !== null) {
        let player = this.state.player;
        player.currentTime = playbackTime;

        this.setState({
          player: player
        })
      }
      this.state.player.play();
    })
  }

  pause() {
    let playbackTime = this.getPlaybackTime(this.state.player.currentTime);
    localStorage.setItem('codepenReactPlayer', playbackTime);
  }

  ended() {
    localStorage.setItem('codepenReactPlayer', 0);
  }

  render() {
    return (
      <audio controls id="player" className="player" preload="false">
        <source src={this.props.link} />
      </audio>
    );
  }
}

ReactDOM.render(
  <AudioPlayer link="https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3" />,
  document.getElementById('root')
);
