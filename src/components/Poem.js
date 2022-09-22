import React from 'react'

const Poem = (props) => {
  return (
    <div>
        {props.page === 'feed' && <h3>By {props.poem.userName}</h3>}
        {props.poem.lines.map((line, i) => {
            return <div key={i}>{line}</div>
        })}
        <hr></hr>
        <div>With some help from:</div>
        {props.poem.authors.map((author, i) => {
            return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
        })}
        <div>On {props.poem.date}</div>
    </div>
  )
}

export default Poem