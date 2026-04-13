import mongoose from "mongoose"

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  newsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    required: true
  }
});

const Favourite =
  mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

export default Favourite ;