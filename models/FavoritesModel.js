var mongoose = require("mongoose");
  const Schema = mongoose.Schema;


var FavoritesModel = new mongoose.Schema({
    JobId: {type:Schema.Types.ObjectId, ref: 'Jobs',required:true},
    UserID: {type:Schema.Types.ObjectId, ref: 'User',required:true},
}, {timestamps: true
}
 );


module.exports = mongoose.model("Favorites", FavoritesModel);