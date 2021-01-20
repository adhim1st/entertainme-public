import React from "react";
import { gql, useQuery } from "@apollo/client";
import MovieCard from "./MovieCard";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function MoviesList() {
  const { data, error, loading, refetch } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h2>Movie List</h2>
      <div className="row">
        {data.movies.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              refetch={refetch}
            ></MovieCard>
          );
        })}
      </div>
    </div>
  );
}
