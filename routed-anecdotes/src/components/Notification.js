import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectNotification } from '../reducers/notification'

export const Notification = () => {
  const [alert, setAlert] = useState('')
  const [show, setShow] = useState(false)

  const alerts = useSelector(selectNotification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    if (alerts.length > 0) {
      const newAlert = [...alerts]
      // get the last element in array
      const _alert = newAlert.at(-1)
      setAlert(_alert)
      setShow(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setShow(false)
      }, 8000)
    }
  }, [alerts])

  //console.log(alerts.length)

  return show ? <div style={style}>{alert.message}</div> : null
}
