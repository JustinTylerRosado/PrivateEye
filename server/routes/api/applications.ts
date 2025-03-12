import { Router, Request, Response } from 'express';
import { pool } from '../../config/connections';

const router = Router();

// Example route
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications');
    res.json(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;