const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
    series: [Series]
    seriesId(id: ID!): Series
  }

  type DeleteResponse {
    message: String
  }

  input newMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input updateMovieData {
    id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Mutation {
    createMovie(newMovie: newMovie): Movie

    createSeries(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Series

    deleteOneMovie(id: ID!): DeleteResponse

    deleteOneSeries(id: ID!): DeleteResponse

    updateMovie(updateMovieData: updateMovieData): Movie

    updateSeries(
      id: ID!
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Series
  }
`;

const resolvers = {
  Query: {
    movies: function () {
      return redis
        .get("movies")
        .then((data) => {
          console.log(data, "redis");
          if (data) {
            return JSON.parse(data);
          } else {
            return axios({
              url: "http://localhost:4001/movies",
              method: "GET",
            })
              .then(({ data }) => {
                redis.set("movies", JSON.stringify(data)).then((result) => {
                  console.log(result, "redisset");
                });
                return data;
              })
              .catch((err) => {
                throw err;
              });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    movie: function (_, args) {
      return axios({
        url: `http://localhost:4001/movies/${args.id}`,
        method: "GET",
      })
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
    series: function () {
      return redis
        .get("series")
        .then((data) => {
          console.log(data, "redis");
          if (data) {
            return JSON.parse(data);
          } else {
            return axios({
              url: "http://localhost:4002/series",
              method: "GET",
            })
              .then(({ data }) => {
                redis.set("series", JSON.stringify(data)).then((result) => {
                  console.log(result, "redisset");
                });
                return data;
              })
              .catch((err) => {
                throw err;
              });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    seriesId: function (_, args) {
      return axios({
        url: `http://localhost:4002/series/${args.id}`,
        method: "GET",
      })
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  Mutation: {
    createMovie: function (_, args) {
      console.log(args);
      const newMovie = {
        title: args.newMovie.title,
        overview: args.newMovie.overview,
        poster_path: args.newMovie.poster_path,
        popularity: args.newMovie.popularity,
        tags: args.newMovie.tags,
      };
      return axios({
        url: "http://localhost:4001/movies",
        method: "POST",
        data: newMovie,
      })
        .then(({ data }) => {
          redis.del("movies").then((result) => {
            console.log(result);
          });
          console.log(data);
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
    deleteOneMovie: function (_, args) {
      console.log(args, "<<<<<,");
      return axios({
        url: `http://localhost:4001/movies/${args.id}`,
        method: "DELETE",
      })
        .then(({ data }) => {
          console.log(data);
          redis.del("movies").then((result) => {
            console.log(result);
          });
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
    updateMovie: function (_, args) {
      console.log(args);
      const updatedMovie = {
        title: args.updateMovieData.title,
        overview: args.updateMovieData.overview,
        poster_path: args.updateMovieData.poster_path,
        popularity: args.updateMovieData.popularity,
        tags: args.updateMovieData.tags,
      };
      return axios({
        url: `http://localhost:4001/movies/${args.updateMovieData.id}`,
        method: "PUT",
        data: updatedMovie,
      })
        .then(({ data }) => {
          console.log(data, "<<<<");
          redis.del("movies").then((result) => {
            console.log(result);
          });
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
    createSeries: function (_, args) {
      const newSeries = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };
      return axios({
        url: "http://localhost:4002/series",
        method: "POST",
        data: newSeries,
      })
        .then(({ data }) => {
          redis.del("series").then((result) => {
            console.log(result);
          });
          console.log(data);
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
    deleteOneSeries: function (_, args) {
      return axios({
        url: `http://localhost:4002/series/${args.id}`,
        method: "DELETE",
      })
        .then(({ data }) => {
          console.log(data);
          redis.del("series").then((result) => {
            console.log(result);
          });
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
    updateSeries: function (_, args) {
      const updatedSeries = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };
      return axios({
        url: `http://localhost:4002/series/${args.id}`,
        method: "PUT",
        data: updatedSeries,
      })
        .then(({ data }) => {
          console.log(data, "<<<<");
          redis.del("series").then((result) => {
            console.log(result);
          });
          return data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
