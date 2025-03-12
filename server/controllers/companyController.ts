import { Request, Response } from 'express';
import { Company } from '../models/company';

// Get Company by ID
export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
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
};

// Create Company
export const createCompany = async (req: Request, res: Response): Promise<void> => {
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
};

// Update Company
export const updateCompany = async (req: Request, res: Response): Promise<void> => {
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
};

// Delete Company
export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
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
};