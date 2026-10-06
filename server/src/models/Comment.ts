import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  articleId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: [true, 'Article ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index to quickly fetch comments for a specific article, sorted by newest
CommentSchema.index({ articleId: 1, createdAt: -1 });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
