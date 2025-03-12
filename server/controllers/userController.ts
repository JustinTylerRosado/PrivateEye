import { Request, Response } from 'express';
import { User } from '../models/user';

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Update User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User updated successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};