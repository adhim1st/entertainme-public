import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { favouriteMovie } from "../cache/index";

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteOneMovie(id: $id) {
      message
    }
  }
`;

export default function MovieCard(props) {
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted() {
      props.refetch();
    },
  });

  const onDelete = (id) => {
    console.log(id);
    deleteMovie({
      variables: { id },
    });
  };

  const onFavourite = (data) => {
    const prevFav = favouriteMovie();
    let duplicate = false;
    for (let i = 0; i < prevFav.length; i++) {
      if (prevFav[i]._id === data._id) {
        duplicate = true;
      }
    }
    if (duplicate === false) {
      favouriteMovie([data, ...prevFav]);
    }
  };

  return (
    <div className="col-md-4" style={{ maxWidth: "100%" }}>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={props.movie.poster_path}
              alt={props.movie.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{props.movie.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="bi bi-star-fill"></i>
                {props.movie.popularity}
              </h6>
              <p className="card-text">{props.movie.overview}</p>
              <div className="row">
                {props.movie.tags.map((tag) => {
                  return (
                    <div className="col">
                      <p class="card-text">
                        <small class="text-muted">{tag}</small>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link
              type="button"
              className="btn btn-secondary"
              to={{
                pathname: `/update-movie/${props.movie._id}`,
              }}
              refetch={props.refetch}
            >
              Update
            </Link>

            <button
              onClick={() => onDelete(props.movie._id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => onFavourite(props.movie)}
            >
              Favourite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
