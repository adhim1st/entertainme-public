import React from "react";
import { gql, useQuery } from "@apollo/client";
import FavouriteCard from "../components/FavouriteCard";

const GET_FAVOURITE_MOVIES = gql`
  query GetFavouriteMovies {
    favouriteItem @client
  }
`;

export default function FavouriteMovie() {
  const { data, error, loading } = useQuery(GET_FAVOURITE_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="container">
      <h1>Favourite Movie</h1>
      {data.favouriteItem &&
        data.favouriteItem.map((fav) => {
          return <FavouriteCard key={fav._id} favcard={fav} />;
        })}
    </div>
  );
}
