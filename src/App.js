import './App.css';
import React, {useState} from "react";

function App() {

  const [started, setStarted] = useState(false);
  const [poems, setPoems] = useState({
    all: [],
    choices: [],
    poem: []
  });

  const select3 = () => {
    console.log(poems);
    for (let i = 0; i < 3; i++) {
      poems.choices.push(poems.all.splice(Math.floor(Math.random()*poems.all.length), 1)[0]);
      console.log(poems.all);
      console.log(poems.all.length);
    }
    poems.choices.map((choice) => {
      console.log(choice);
      let num = Math.floor(Math.random()*choice.lines.length);
      choice.prevLines = [];
      choice.line = choice.lines[num];
      if (choice.line === "") choice.line = "[-]"
      choice.index = num;
      for (let i = 1; i < 5; i++) {
        if (choice.lines[num - i]) choice.prevLines.unshift(choice.lines[num - i]);
      }
      return {...choice}
    })
    setPoems(JSON.parse(JSON.stringify({...poems})))
  }

  const getPoems = () => {
    fetch(`https://poetrydb.org/random/60.json`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        poems.all = data;
        setPoems({...poems});
        select3();
      })
      .catch(err => console.log(err))
  }

  const start = () => {
    getPoems();
    setStarted(true);
  }

  const add = (line) => {
    poems.poem.push(line);
    poems.choices = [];
    select3();
  }

  return (
    <div className="App">
      {!started && 
        <header className="App-header">
          <h1>CAESURA</h1>
          <span>(cae·su·ra, sēˈzyo͝orə): a break or pause in the middle of a verse</span>
          <h2>Poetry, remixed.</h2>
          <button onClick={start}>Get Started</button>
        </header>
      }
      {
        poems.all.length > 0 &&
        <div>
          <section className="container">
            {poems.choices.map((poem, index) => {
              return (
                <div onClick={() => {add(poem.line)}} className="poem" key={index}>
                  <h6>from</h6>
                  <h3>{poem.title}</h3>
                  <h6>{poem.author}</h6>
                  {poem.prevLines.map((prevLine, index) => {
                    return <div className="prevLine" key={index}>{prevLine}</div>
                  })}
                  <div>{poem.line}</div>
                </div>
              )
            })}
          </section>
          <hr />
        </div>
      }
      {poems.all.length === 0 && 
        <h2>Your Poem</h2>
      }
      <section className="container final">
        {poems.poem.map((line, index) => {
          return <div key={index}>{line}</div>
        })}
      </section>
    </div>
  );
}

export default App;
