import React from 'react'

const Artist = (props) => {
  return (
    <div>
      <img src={props.image} />
      <h1>{props.name}</h1>
      {props.songs.map((song, i) =>
        <div key={i}>{song.nameSong} <i className="fas fa-heart"></i><i className="far fa-thumbs-down"></i>{song.like}</div>
      )}
    </div>
  )
}

export default Artist