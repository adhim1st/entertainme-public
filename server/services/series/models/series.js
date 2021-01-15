const db = require("../config/mongo");
const Series = db.collection("series");
const { ObjectId } = require("mongodb");

class SeriesModel {
  static find() {
    return Series.find().toArray();
  }
  static findOne(id) {
    return Series.findOne({
      _id: ObjectId(id),
    });
  }
  static create(payload) {
    return Series.insertOne(payload).then((data) => {
      return data.ops[0];
    });
  }
  static removeOne(id) {
    return Series.findOneAndDelete({
      _id: ObjectId(id),
    });
  }
  static remove() {
    return Series.remove({});
  }
  static update(payload) {
    return Series.findOneAndUpdate(
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

module.exports = SeriesModel;
