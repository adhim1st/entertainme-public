import React from "react";
import { gql, useQuery } from "@apollo/client";
import SeriesCard from "./SeriesCard";

const GET_SERIES = gql`
  query GetSeries {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function SeriesList() {
  const { data, error, loading } = useQuery(GET_SERIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h2>Series List</h2>
      <div className="row">
        {data.series.map((series) => {
          return <SeriesCard key={series._id} series={series}></SeriesCard>;
        })}
      </div>
    </div>
  );
}
