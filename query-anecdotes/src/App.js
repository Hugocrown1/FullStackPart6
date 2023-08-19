import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

import NotificationContext from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SET":
      return action.content
    case "DISMISS":
      return null
    default:
        return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({type: 'SET' ,content: 'too short anecdote, must have length 5 or more'})

      setTimeout(() => {
        notificationDispatch({ type: 'DISMISS'});
      }, 5000);

    }
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  // exercise 6.22
  const voteAnecdote = (anecdote) => {
   
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  // exercise 6.21
  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({content, votes: 0})
  }


  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 })
  

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  // exercise 6.20
  if (result.isError) {
    return <div>anecdote service not available due to problems in server, error: {result.error.message} </div>
  }

  

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    notificationDispatch({type: 'SET', content: `anecdote '${anecdote.content}' voted`})
    voteAnecdote(anecdote)

    setTimeout(() => {
      notificationDispatch({ type: 'DISMISS'});
    }, 5000);
  
    
    
  }






  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification /> 
        <AnecdoteForm addAnecdote={addAnecdote}/>
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
