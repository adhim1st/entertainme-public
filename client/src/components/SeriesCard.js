import React from "react";

export default function SeriesCard(props) {
  return (
    <div className="col-md-4" style={{ maxWidth: "100%" }}>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={props.series.poster_path}
              alt={props.series.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            ></img>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{props.series.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="bi bi-star-fill"></i>
                {props.series.popularity}
              </h6>
              <p className="card-text">{props.series.overview}</p>
              <div className="row">
                {props.series.tags.map((tag) => {
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
        </div>
      </div>
    </div>
  );
}
