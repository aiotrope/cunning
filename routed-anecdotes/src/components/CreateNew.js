import React from 'react'
import { createAnecdote } from '../reducers/anecdotes'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { setNotification } from '../reducers/notification'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

export const CreateNew = () => {
  /****** solution based from https://stackoverflow.com/a/73931276 *********/
  const { clearInput: clearInputContent, ...content } = useField('content')
  const { clearInput: clearInputAuthor, ...author } = useField('author')
  const { clearInput: clearInputInfo, ...info } = useField('info')
  /************************************************************************/
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      if (event) event.preventDefault()
      if (content.value !== '' && author.value !== '' && info.value !== '') {
        const resultAction = await dispatch(
          createAnecdote({
            content: content.value,
            author: author.value,
            info: info.value,
          })
        )
        const originalPromiseResult = unwrapResult(resultAction)
        console.log(originalPromiseResult)
        await dispatch(
          setNotification(`a new anecdote ${content.value} created!`)
        )
        console.log(content)
        navigate('/')
        return originalPromiseResult
      } else {
        dispatch(setNotification('all fields are required!'))
        handleClearInput()
      }

      console.log(content.value)
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError)
    }
  }

  const handleClearInput = (event) => {
    if (event) event.preventDefault()
    clearInputContent()
    clearInputAuthor()
    clearInputInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleClearInput}>reset</button>
      </form>
    </div>
  )
}
