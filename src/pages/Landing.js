import React from 'react'

const Landing = (props) => {
  return (
    <div className="App">
        <header className="App-header">
          <h1>CAESURA</h1>
          <span>(cae·su·ra, sēˈzyo͝orə): a break or pause in the middle of a verse</span>
          <h2>Poetry, remixed.</h2>
          <button onClick={() => {props.setPage("create")}}>Get Started</button>
        </header>
    </div>
  )
}

export default Landing