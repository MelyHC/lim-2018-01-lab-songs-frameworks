import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Key API 108bddcd9fefc3e86bc16a18ad53e089

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistAlbum: [
        'rollingstone',
        'madonna',
        'michaeljackson',
        'beatles',
        'whitneyhouston'
      ],
      currentArtist: 0,
      image: '',
      name: '',
      songs: []
    }
  }

  componentWillMount() {
    const { artistAlbum, currentArtist, songs } = this.state;
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistAlbum[currentArtist]}&api_key=108bddcd9fefc3e86bc16a18ad53e089&format=json`)
      .then(response => response.json())
      .then(arrArtistSongs => {
        const arrAlbum = Object.values(arrArtistSongs.toptracks);
        const artist = arrAlbum[1].artist;
        arrAlbum[0].forEach(objSong => {
          songs.push({
            nameSong: objSong.name,
            like: 0
          })
        });
        const imageArtist = arrAlbum[0][0].image[3]['#text'];
        this.setState({
          image: imageArtist,
          name: artist,
          songs
        })
      })
      .catch(err => console.error(err))
  }

  handleChange = () => {
    const { currentArtist } = this.state;
    this.setState({
      currentArtist: currentArtist + 1
    })
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
        <button >anterior</button>
        <button onClick={this.handleChange}>siguiente</button>
        <div>
          <img src={this.state.image} />
          <h1>{this.state.name}</h1>
          {this.state.songs.map((song, i) => <div key={i}>{song.nameSong}</div>)}
        </div>

      </div>
    );
  }
}

export default App;
