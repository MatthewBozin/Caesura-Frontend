import React from 'react'

const Poem = (props) => {
  return (
    <div>
        {props.poem.lines.map((line, i) => {
            return <div key={i}>{line}</div>
        })}
    </div>
  )
}

export default Poem