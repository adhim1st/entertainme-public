import React from "react";
import MoviesList from "../components/MoviesList";
import SeriesList from "../components/SeriesList";

export default function MainPage() {
  return (
    <div className="container">
      <h1>Main Page</h1>
      <MoviesList></MoviesList>
      <SeriesList></SeriesList>
    </div>
  );
}
