import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {

    const dispatch = useDispatch()

    // exercise 6.4
    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        // exercise 6.15 & 6.17
        
        dispatch(createAnecdote(content))

    }

    
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
      </>
    )
}

export default AnecdoteForm