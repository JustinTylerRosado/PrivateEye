import { Router, Request, Response } from 'express';
import { Note } from '../../models/note';

const router = Router();

// Example route
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;
