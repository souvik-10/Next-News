import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const generateToken = (id: string, email: string): string => {
  return jwt.sign({ id, email }, ENV.JWT_SECRET, {
    expiresIn: '30d',
  });
};
