import mongoose, { Document, Schema } from 'mongoose';

export interface IWatchlist extends Document {
  userId: mongoose.Types.ObjectId;
  articles: mongoose.Types.ObjectId[];
  updatedAt: Date;
}

const WatchlistSchema: Schema<IWatchlist> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true, // One watchlist per user
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Watchlist = mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);
