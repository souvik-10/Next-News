import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  tags: string[];
  viewsCount: number;
  readTimeMinutes: number;
  isBreaking: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema<IArticle> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      maxlength: [500, 'Summary cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    readTimeMinutes: {
      type: Number,
      default: 1,
    },
    isBreaking: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient querying and sorting
ArticleSchema.index({ category: 1, createdAt: -1 });
ArticleSchema.index({ createdAt: -1 });

export const Article = mongoose.model<IArticle>('Article', ArticleSchema);
