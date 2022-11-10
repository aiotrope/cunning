import React, { useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { retrieveAnecdotes, getAllAnecdotes } from '../reducers/anecdotes'

export const AnecdoteList = () => {
  const anecdotes = [...useSelector(getAllAnecdotes)].sort((a, b) => {
    return b.votes - a.votes
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const getAnecdotes = async () => {
      try {
        const resultAction = await dispatch(retrieveAnecdotes())
        const originalPromiseResult = unwrapResult(resultAction)
        //console.log(originalPromiseResult)
        return originalPromiseResult
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }

    getAnecdotes()
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
