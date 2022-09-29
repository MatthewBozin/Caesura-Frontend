import React, {useState} from "react";
import { Button, CircularProgress } from '@mui/material'
import DataService from "../dataService";

const Create = (props) => {

  const [poems, setPoems] = useState({
    all: [],
    choices: [],
    poem: {authors: [], lines: []}
  });

  const [loading, setLoading] = useState(poems.all.length === 0)

  const handleSubmit = async e => {
      e.preventDefault();
      console.log(poems.poem)
      let msg = poems.poem;
      msg.userName = props.user.userName;
      msg.authors = [...new Set(msg.authors)];
      props.setPage('feed')
      setPoems({
        all: [],
        choices: [],
        poem: {authors: [], lines: []}
      })
      await DataService.createPoem(msg);
  }

  const select3 = () => {
    for (let i = 0; i < 3; i++) {
      //splices three randomly selected poems from poems.all and pushes them into choices
      poems.choices.push(poems.all.splice(Math.floor(Math.random()*poems.all.length), 1)[0]);
    }
    //for each poem in choices
    poems.choices.map((choice) => {
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
    setPoems(JSON.parse(JSON.stringify({...poems})))
  }

  const getPoems = async () => {
    const res = await fetch(`https://poetrydb.org/random/30`);
    const data = await res.json();
    poems.all = data;
    setPoems({...poems});
    setLoading(false);
    select3();
  }

  const add = async (line, author) => {
    if (poems.all.length === 3) {
      await getPoems();
    }
    poems.poem.lines.push(line);
    poems.poem.authors.push(author);
    poems.choices = [];
    select3();
  }

  if (poems.all.length === 0) {
    getPoems();
  }

  return (
    <>
      {loading === true ? (
        <div className="loader">
          <CircularProgress/>
        </div>
      ) : (
        <div className="app">
            <div>
              <section className="container">
                {poems.choices.map((poem, index) => {
                  return (
                    <div className="choice" key={index} onClick={() => {add(poem.line, poem.author)}}>
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
          {poems.all.length !== 0 && 
            <h2>Your Poem</h2>
          }
          <section className="container final">
            {poems.poem.lines.map((line, index) => {
              return <div key={index}>{line}</div>
            })}
          </section>
          {poems.all.length !== 0 && 
            <Button onClick={handleSubmit} type='submit' variant='contained' color='primary' fullWidth>Create</Button>
          }
        </div>
      )}
    </>
  )
}

export default Create