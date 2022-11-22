import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Menu } from './components/Menu'
import { Signup } from './features/users/Signup'
import { Login } from './features/users/Login'
import { Blogs } from './features/blogs/Blogs'
import { Blog } from './features/blogs/Blog'
import { Users } from './features/users/Users'
import { User } from './features/users/User'
import { NotFound } from './components/NotFound'
import './_App.scss'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [authUsername, setAuthUsername] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const setState = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem('user'))
        if (user !== null) {
          setAuthUsername(user.username)
        }
      } catch (rejectedValueOrSerializedError) {
        console.error(rejectedValueOrSerializedError)
      }
    }
    setState()
  }, [dispatch])

  return (
    <Router>
      <div className="container">
        <header className="mt-5">
          <Menu authUsername={authUsername} />
        </header>

        <main>
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <Blogs
                    loading={loading}
                    setLoading={setLoading}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    authUsername={authUsername}
                  />
                }
              />

              <Route
                path="/login"
                element={
                  <Login
                    loading={loading}
                    setLoading={setLoading}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    authUsername={authUsername}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Signup
                    loading={loading}
                    setLoading={setLoading}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    authUsername={authUsername}
                  />
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <Blog
                    loading={loading}
                    setLoading={setLoading}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    authUsername={authUsername}
                  />
                }
              />
              <Route
                path="/users"
                element={<Users authUsername={authUsername} />}
              />
              <Route
                path="/users/:id"
                element={
                  <User
                    loading={loading}
                    setLoading={setLoading}
                    authUsername={authUsername}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
