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
      'whitneyhouston',
      'nirvana'
    ],
    currentArtist: 0,
    artists: []
  }

  componentWillMount() {
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
              like: objSong.playcount
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
    const { currentArtist } = this.state;
    if (currentArtist === 0) {
      this.setState({ currentArtist: 5 })
    } else {
      this.setState({
        currentArtist: currentArtist - 1
      })
    }
  }

  handleUpDown = (index, option) => {
    const { artists, currentArtist } = this.state;
    option ? artists[currentArtist].songs[index].like++ : artists[currentArtist].songs[index].like--;
    artists[currentArtist].songs.sort((a, b) => b.like - a.like);
    this.setState({
      artists
    });
  }

  handleDislike = (index) => {
    const { artists, currentArtist } = this.state;
    if (artists[currentArtist].songs[index].like > 0) {
      this.handleUpDown(index)
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
        {this.state.artists.length ? (
          <div>
            <i className="preview fas fa-angle-left" onClick={this.handlePreview}></i>
            <i className="next fas fa-angle-right" onClick={this.handleNext}></i>
            {this.state.artists.map((artist, i) =>
              <Artist key={i}
                name={artist.name}
                image={artist.image}
                songs={artist.songs}
                like={this.handleUpDown}
                dislike={this.handleDislike} />
            )[this.state.currentArtist]}
          </div>
        ) : (<h3 className="loading">Cargando <i className="loading-logo fas fa-spinner"></i></h3>)}
      </div>
    );
  }
}

export default App;
