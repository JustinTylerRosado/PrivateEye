import { Router, Request, Response } from 'express';
import { User } from '../../models/user';
import { Interview } from '../../models/interview';

const router = Router();

// Get User by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
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
});

// Update User
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
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
});

// Delete User
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
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
});

// Register Interview
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get Interview by ID
router.get('/interviews/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const interview = await Interview.findByPk(req.params.id);
    if (!interview) {
      res.status(404).json({ error: 'Interview not found' });
      return;
    }
    res.json(interview);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update Interview
router.put('/interviews/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Interview.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      res.status(404).json({ error: 'Interview not found' });
      return;
    }
    res.json({ message: 'Interview updated successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Delete Interview
router.delete('/interviews/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Interview.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ error: 'Interview not found' });
      return;
    }
    res.json({ message: 'Interview deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;
