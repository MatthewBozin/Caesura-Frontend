import React, {useState, useEffect} from "react";
import dataService from '../dataService';

const Profile = () => {

  const [feed, setFeed] = useState(null);

  useEffect(() => {
    dataService.getFeed().then((res) => {
      console.log(res.data);
      setFeed(res.data.poems)
    })
  }, [])

  console.log(feed)

  return (
    <div>
        {feed && feed.map((poem) => {
            return poem.lines.map((line, i) => {
                return <div key={i}>{line}</div>
            })
        })}
    </div>
  )
}

export default Profile