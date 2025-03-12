import { Router, Request, Response } from 'express';
import { Company } from '../../models/company';

const router = Router();

// Get all companies
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get company by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json(company);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Create company
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update company
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Company.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json({ message: 'Company updated successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Delete company
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Company.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;
