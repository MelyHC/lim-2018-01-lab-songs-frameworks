import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artist from './components/Artist'

//Key API 108bddcd9fefc3e86bc16a18ad53e089

class App extends Component {
  state = {
    artistAlbum: [
      'adele',
      'rollingstone',
      'madonna',
      'michaeljackson',
      'beatles',
      'whitneyhouston'
    ],
    currentArtist: 0,
    artists: []
  }

  componentDidMount() {
    const { artistAlbum } = this.state;
    const promisesArtist = artistAlbum.map(artist =>
      fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=108bddcd9fefc3e86bc16a18ad53e089&format=json`)
        .then(response => response.json())
        .catch(err => console.error(err))
    )
    Promise.all(promisesArtist)
      .then(arrArtist => {
        const dataArtist = arrArtist.map(albumArtist => {
          const songs = [];
          const arrAlbum = Object.values(albumArtist.toptracks);
          arrAlbum[0].forEach(objSong => {
            songs.push({
              nameSong: objSong.name,
              like: 0
            })
          });
          return {
            name: arrAlbum[1].artist,
            image: arrAlbum[0][0].image[3]['#text'],
            songs
          }
        })
        this.setState({
          artists: dataArtist
        })
      })
  }

  handleNext = () => {
    const { currentArtist, artistAlbum } = this.state;
    if (currentArtist === artistAlbum.length - 1) {
      this.setState({ currentArtist: 0 })
    } else {
      this.setState({
        currentArtist: currentArtist + 1
      })
    }
  }

  handlePreview = () => {
    const { currentArtist, artistAlbum } = this.state;
    if (currentArtist === 0) {
      this.setState({ currentArtist: 5 })
    } else {
      this.setState({
        currentArtist: currentArtist - 1
      })
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h2>
            Ranking Songs
            <img src={logo} className="App-logo" alt="logo" />
          </h2>
        </header>
        <button onClick={this.handlePreview}>anterior</button>
        <button onClick={this.handleNext}>siguiente</button>
        {this.state.artists.map((artist, i) =>
          <Artist key={i}
            name={artist.name}
            image={artist.image}
            songs={artist.songs} />
        )[this.state.currentArtist]}
      </div>
    );
  }
}

export default App;
