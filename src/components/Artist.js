import React from 'react'

const Artist = (props) => {
  return (
    <div>
      <img className="imgArtist" src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      {props.songs.map((song, i) =>
        <div className="row song" key={i}>
          <span className="col-6 col-sm-7 text-left">{song.nameSong}</span>
          <i className="fas fa-heart col-1" onClick={() => props.like(i, 'plus')}></i>
          <i className="far fa-thumbs-down col-1" onClick={() => props.dislike(i)}></i>
          <span className="col-3">{song.like}</span>
        </div>
      )}
    </div>
  )
}

export default Artist