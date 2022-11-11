import React from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { AnecdoteList } from './components/AnecdoteList'
import { About } from './components/About'
import { CreateNew } from './components/CreateNew'
import { NotFound } from './components/NotFound'
import { Footer } from './components/Footer'
import { Anecdote } from './components/Anecdote'
import { Notification } from './components/Notification'

import './App.scss'

const Menu = () => {
  let activeStyle = {
    color: '#555',
    textDecoration: 'underline',
  }

  return (
    <>
      <nav className="menu-nav">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          anecdote
        </NavLink>
        <NavLink
          to="create-new"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          create new
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          about
        </NavLink>
      </nav>
    </>
  )
}

const App = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <h1>
          <Link to="/" className="title">
            Software anecdotes
          </Link>
        </h1>
        <Menu />
      </header>
      <main>
        <Notification />

        <Routes>
          <Route path="/" element={<AnecdoteList />} />
          <Route path="/anecdotes/:id" element={<Anecdote />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
