import React from "react";

const Create = (props) => {

  const select3 = () => {
    for (let i = 0; i < 3; i++) {
      props.poems.choices.push(props.poems.all.splice(Math.floor(Math.random()*props.poems.all.length), 1)[0]);
    }
    props.poems.choices.map((choice) => {
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
    props.setPoems(JSON.parse(JSON.stringify({...props.poems})))
  }

  const getPoems = async () => {
    // let test = await DataService.test()
    // console.log(test.data);
    const res = await fetch(`https://poetrydb.org/random/60`);
    const data = await res.json();
    props.poems.all = data;
    props.setPoems({...props.poems});
    select3();
  }

  const add = (line) => {
    props.poems.poem.push(line);
    props.poems.choices = [];
    select3();
  }

  if (props.poems.all.length === 0) {
    getPoems();
  }

  return (
    <div>
      {
        props.poems.all.length > 0 &&
        <div>
          <section className="container">
            {props.poems.choices.map((poem, index) => {
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
      {props.poems.all.length === 0 && 
        <h2>Your Poem</h2>
      }
      <section className="container final">
        {props.poems.poem.map((line, index) => {
          return <div key={index}>{line}</div>
        })}
      </section>
    </div>
  )
}

export default Create