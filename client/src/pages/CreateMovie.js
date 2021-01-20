import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TagInput } from "reactjs-tag-input";
import { useHistory } from "react-router-dom";

const CREATE_MOVIE = gql`
  mutation CreateMovie($newMovie: newMovie) {
    createMovie(newMovie: $newMovie) {
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

export default function CreateMovie() {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const history = useHistory();

  const [tags, setTags] = useState([]);
  const [createMovie] = useMutation(CREATE_MOVIE, {
    refetchQueries: [
      {
        query: GET_MOVIES,
      },
    ],
  });

  const onTagsChanged = (tags) => {
    setTags(tags);
  };

  const onSubmit = (data) => {
    let sendTags = tags.map((e) => e.displayValue);
    let temp = Number(data.popularity);

    createMovie({
      variables: {
        newMovie: { ...data, popularity: temp, tags: sendTags },
      },
    });
    history.push("/");
  };

  return (
    <div className="container">
      <h2>Create Movie</h2>
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
