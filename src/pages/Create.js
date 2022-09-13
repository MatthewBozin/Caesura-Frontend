import React, {useState, useEffect} from "react";
import DataService from "../dataService";

const Create = () => {

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

  const getPoems = async () => {
    // let test = await DataService.test()
    // console.log(test.data);
    const res = await fetch(`https://poetrydb.org/random/60`);
    const data = await res.json();
    console.log(data);
    poems.all = data;
    setPoems({...poems});
    select3();
  }

  const add = (line) => {
    poems.poem.push(line);
    poems.choices = [];
    select3();
  }

  useEffect(() => {
    console.log("useeffect");
    getPoems();
  }, [])

  return (
    <div>
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
  )
}

export default Create