const db = require("../config/mongo");
const Movie = db.collection("movies");
const { ObjectId } = require("mongodb");

class MovieModel {
  static find() {
    return Movie.find().toArray();
  }
  static create(payload) {
    return Movie.insertOne(payload).then((data) => {
      return data.ops[0];
    });
  }
  static removeOne(id) {
    return Movie.findOneAndDelete({
      _id: ObjectId(id),
    });
  }
  static remove() {
    return Movie.remove({});
  }
  static update(payload) {
    return Movie.findOneAndUpdate(
      {
        _id: ObjectId(payload.id),
      },
      {
        $set: {
          title: payload.title,
          overview: payload.overview,
          poster_path: payload.poster_path,
          popularity: payload.popularity,
          tags: payload.tags,
        },
      }
    );
  }
}

module.exports = MovieModel;
