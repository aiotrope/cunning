import { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { AnecdoteList } from "./components/AnecdoteList";
import { About } from "./components/About";
import { CreateNew } from "./components/CreateNew";
import { Footer } from "./components/Footer";
import "./App.css";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  let activeStyle = {
    textDecoration: "none"
  };

  return (
    <>
      <nav>
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
  );
};


const App = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  //console.log(anecdotes);
  return (
    <div className="wrapper">
      <h1>
        <Link to="/" className="title">
          Software anecdotes
        </Link>
      </h1>
      <Menu />

      <Routes>
        <Route
          path="/"
          element={
            <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/create-new" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
