import React from 'react';
import { connectToDatabase } from '../util/mongodb';

export default function Movies({ movies }) {
  const book = async (property) => {
    const data = await fetch(
      `http://localhost:3000/api/save?property_id=${property._id}`,
    );
    const res = await data.json();
    console.log(res);
  };
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li>
            <h2 onClick={() => book(movie)}>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection('movies')
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
