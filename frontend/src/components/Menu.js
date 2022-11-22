import React, { useCallback } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector, logout } from '../features/users/userSlice'

export const Menu = ({ authUsername }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useSelector(userSelector)

  const onLogout = useCallback(() => {
    dispatch(logout())
    navigate('/login')
    window.location.reload()
  }, [dispatch, navigate])

  return (
    <>
      <div>
        <h1>
          <Link to={'/'}>Cunning</Link>
        </h1>
      </div>

      <nav className="menu-nav">
        <div>
          {authUsername ? (
            <>
              <NavLink to={'/'}>Blogs</NavLink>
              <NavLink to={'/users'}>Users</NavLink>
              <NavLink to={`/users/${id}`}>{authUsername} logged in</NavLink>
              <button onClick={onLogout} type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to={'/login'}>Login</NavLink>
              <NavLink to={'/signup'}>Signup</NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  )
}
