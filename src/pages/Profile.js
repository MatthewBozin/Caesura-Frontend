import React, {useState, useEffect} from "react";
import dataService from '../dataService';
import Poem from "../components/Poem";

const Profile = () => {
  const [poems, setPoems] = useState(null);

  useEffect(() => {
    dataService.getPoems().then((res) => {
      setPoems(res.data.poems)
    })
  }, [])

  return (
    <div>
        {poems && poems.map((poem, i) => <Poem poem={poem} page='profile' key={i} />)}
    </div>
  )
}

export default Profile