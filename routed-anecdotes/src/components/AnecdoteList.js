import { useEffect } from "react";
import anecdoteService from "../services/anecdotes";

export const AnecdoteList = ({ anecdotes, setAnecdotes }) => {
  useEffect(() => {
    const getAnecdotes = async () => {
      try {
        const response = await anecdoteService.getAll();
        setAnecdotes(response);
      } catch (error) {
        console.error(error);
      }
    };

    getAnecdotes();
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.content}</li>
        ))}
      </ul>
    </div>
  );
};
