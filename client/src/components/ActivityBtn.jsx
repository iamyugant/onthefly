import {useState} from 'react';
import './ActivityBtn.css'

const ActivityBtn = (props) =>  {

  const [num_votes, setNumVotes] = useState(props.num_votes)

  const updateCount = async () => {
    const next = num_votes + 1
    setNumVotes(next)

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ num_votes: next })
    }

    await fetch('/api/activities/' + props.id, options)
  }

  return (
    <button className='activityBtn' id={props.id} onClick={updateCount}>
      {props.activity} <br/> {'△ ' + num_votes + ' Upvotes' }
    </button>
  )

}

export default ActivityBtn;
