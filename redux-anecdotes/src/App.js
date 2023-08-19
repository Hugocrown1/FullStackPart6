import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'

import anecdoteService from './services/anecdotes.js'
import { setAnecdotes } from './reducers/anecdoteReducer'

// exercise 6.16
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {

  const dispatch = useDispatch()

  // exercise 6.14
  useEffect(() => {
   dispatch(initializeAnecdotes())
  
   
  }, [dispatch])
  
 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>

      {/* exercise 6.9 */}
      <Filter/>

      {/* exercise 6.8 */}
      <AnecdoteList/>
      
      {/* exercise 6.7 */}
      <AnecdoteForm/>
      
    </div>
  )
}

export default App