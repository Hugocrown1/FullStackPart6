import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {


    
    const anecdotes = useSelector(state => {
      const { anecdotes, filter } = state
      if(filter === ''){
        return anecdotes
      }
      return anecdotes.filter( ({ content }) =>
        content.toLowerCase().includes(filter.toLowerCase())  
      );
      
    })
  const sortedAnecdotes = anecdotes.slice().sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
  const dispatch = useDispatch()

  

  // exercise 6.3
  const vote = (anecdote) => {

    const { id, content} = anecdote

    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    dispatch(setNotification(`you voted '${content}'`, 5))
    
    dispatch(voteAnecdote(id, newObject ))
  }
  return (
    <>
    {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        
      )}
    </>
  )
}
