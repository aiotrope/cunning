import React, { useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveAnecdoteById, getAnecdote } from '../reducers/anecdotes'
import { useParams } from 'react-router-dom'

export const Anecdote = () => {
  const anecdote = useSelector(getAnecdote)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    try {
      const resultAction = dispatch(retrieveAnecdoteById(id))
      unwrapResult(resultAction)
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError)
    }
  }, [])

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}
