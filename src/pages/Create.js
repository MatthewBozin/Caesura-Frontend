import React, {useState} from "react";
import { Button, CircularProgress } from '@mui/material'
import DataService from "../dataService";

const Create = (props) => {

  const [poems, setPoems] = useState({
    all: [],
    choices: [],
    poem: {authors: [], lines: [], title: ''}
  });

  const [step, setStep] = useState('poem')

  const [activeTitles, setActiveTitles] = useState([])

  const [loading, setLoading] = useState(poems.all.length === 0)

  const handleSubmit = async e => {
      e.preventDefault();
      console.log(props.poems.poem)
      let msg = props.poems.poem;
      msg.userName = props.user.userName;
      msg.authors = [...new Set(msg.authors)];
      props.setPage('feed')
      props.setPoems({
        all: [],
        choices: [],
        titles: [],
        poem: {authors: [], lines: []}
      })
      await DataService.createPoem(msg);
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
    const res = await fetch(`https://poetrydb.org/random/30`);
    const data = await res.json();
    props.poems.all = data;
    props.setPoems({...props.poems});
    setLoading(false);
    select3();
  }

  const add = async (line, author, title) => {
    if (poems.all.length === 3) {
      await getPoems();
    }
    poems.poem.lines.push(line);
    poems.poem.authors.push(author);
    setActiveTitles([...activeTitles, ...title.split(' ')])
    poems.choices = [];
    select3();
  }

  const addToTitle = (word) => {
    poems.poem.title += word + ' '
    setPoems({...poems})
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
          <h2>Build Your Poem</h2>
            <div>
              {step === 'poem' && (
                <section className="container">
                  {poems.choices.map((poem, index) => {
                    return (
                      <div className="choice" key={index} onClick={() => {add(poem.line, poem.author, poem.title)}}>
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
              )}
              {step === 'title' && (
                <section className="container">
                  {activeTitles.map((word, index) => {
                    return <Button onClick={() => {addToTitle(word)}} key={index} type='submit' variant='contained' color='primary' fullWidth>{word}</Button>
                  })}
                </section>
              )}
              <hr />
            </div>
          {props.poems.all.length !== 0 && 
            <h3>Your Poem</h3>
          }
          {step === 'title' && (
            <h3>{poems.poem.title}</h3>
          )}
          <section className="container final">
            {props.poems.poem.lines.map((line, index) => {
              return <div key={index}>{line}</div>
            })}
          </section>
          {step === 'poem' && 
            <Button onClick={() => {setStep('title')}} type='submit' variant='contained' color='primary' fullWidth>Create</Button>
          }
          {step === 'title' && 
            <Button onClick={() => {setStep('poem');handleSubmit()}} type='submit' variant='contained' color='primary' fullWidth>Create</Button>
          }
        </div>
      )}
    </>
  )
}

export default Create