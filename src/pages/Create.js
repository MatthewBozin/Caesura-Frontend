import React from "react";
import { Button } from '@mui/material'
import DataService from "../dataService";

const Create = (props) => {

  const handleSubmit = async e => {
      e.preventDefault();
      console.log(props.poems.poem)
      await DataService.createPoem(props.poems.poem);
  }

  const select3 = () => {
    for (let i = 0; i < 3; i++) {
      //splices three randomly selected poems from props.poems.all and pushes them into choices
      props.poems.choices.push(props.poems.all.splice(Math.floor(Math.random()*props.poems.all.length), 1)[0]);
    }
    //for each poem in choices
    props.poems.choices.map((choice) => {
      //select a random index from poem.lines.length
      let num = Math.floor(Math.random()*choice.lines.length);
      //get the line at index
      choice.line = choice.lines[num];
      //add break symbol if line is space
      if (choice.line === "") choice.line = "[-]"
      choice.index = num;
      choice.prevLines = [];
      //if a line exists i lines before index,
      //add it to choice.prevLines
      //do this 5 times
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

  const add = (line, author) => {
    props.poems.poem.lines.push(line);
    props.poems.poem.authors.push(author);
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
                <div onClick={() => {add(poem.line, poem.author)}} className="poem" key={index}>
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
      {props.poems.all.length !== 0 && 
        <h2>Your Poem</h2>
      }
      <section className="container final">
        {props.poems.poem.lines.map((line, index) => {
          return <div key={index}>{line}</div>
        })}
      </section>
      {props.poems.all.length !== 0 && 
        <Button onClick={handleSubmit} type='submit' variant='contained' color='primary' fullWidth>Create</Button>
      }
    </div>
  )
}

export default Create