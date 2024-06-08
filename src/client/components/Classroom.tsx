import React, { useEffect, useState, FormEvent } from "react";
import { Classrooms } from '../../types';


const Classroom = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {

  }, [charts])


  return (
    <div>
      <form>
        <input type='text' id='newclassname' placeholder='Enter new classroom name' />
        <button>+</button>
      </form>
      {charts.length ? charts : 'Make a new classroom Chart!'}
    </div>
  )

}

export default Classroom;
