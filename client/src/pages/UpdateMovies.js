import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { TagInput } from "reactjs-tag-input";
import { useParams, useHistory } from "react-router-dom";

const GET_ONE_MOVIE = gql`
  query GetOneMovie($id: ID!) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const UPDATE_MOVIE = gql`
  mutation UpdateMovie($updateMovieData: updateMovieData) {
    updateMovie(updateMovieData: $updateMovieData) {
      title
    }
  }
`;
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

export default function UpdateMovies(props) {
  const { movieId } = useParams();
  const [tags, setTags] = useState([]);
  const { data, error, loading } = useQuery(GET_ONE_MOVIE, {
    variables: { id: movieId },
  });
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [
      {
        query: GET_MOVIES,
      },
    ],
  });
  const { register, handleSubmit, reset, errors } = useForm({ mode: "onBlur" });
  const history = useHistory();

  const onTagsChanged = (tags) => {
    setTags(tags);
  };

  useEffect(() => {
    if (data) {
      reset({
        title: data.movie.title,
        overview: data.movie.overview,
        poster_path: data.movie.poster_path,
        popularity: data.movie.popularity,
      });
    }
  }, [data, reset]);

  const onSubmit = (data) => {
    let sendTags = tags.map((e) => e.displayValue);
    let temp = Number(data.popularity);
    updateMovie({
      variables: {
        updateMovieData: {
          id: movieId,
          ...data,
          popularity: temp,
          tags: sendTags,
        },
      },
    });
    history.push("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-2">
          <label>Title</label>
          <input
            className="form-control"
            name="title"
            type="text"
            ref={register({ required: "Title Required" })}
          ></input>
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <label>Overview</label>
          <textarea
            className="form-control"
            name="overview"
            type="text"
            rows="3"
            ref={register({ required: "Overview Required" })}
          ></textarea>
          {errors.overview && (
            <p style={{ color: "red" }}>{errors.overview.message}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <label>Poster Path</label>
          <input
            className="form-control"
            name="poster_path"
            type="text"
            ref={register({ required: "Poster Path Required" })}
          ></input>
          {errors.poster_path && (
            <p style={{ color: "red" }}>{errors.poster_path.message}</p>
          )}
        </div>
        <div className="form-group mb-2">
          <label>Popularity</label>
          <input
            className="form-control"
            name="popularity"
            type="number"
            ref={register({
              required: "Popularity Required",
              min: { value: 1, message: "Min Score is 1" },
              max: { value: 10, message: "Max Score is 10" },
            })}
          ></input>
          {errors.popularity && (
            <p style={{ color: "red" }}>{errors.popularity.message}</p>
          )}
        </div>
        <input className="btn btn-primary" type="submit" value="Submit"></input>
      </form>
      <TagInput
        tags={tags}
        tagStyle={`background: grey`}
        onTagsChanged={onTagsChanged}
      ></TagInput>
    </div>
  );
}
