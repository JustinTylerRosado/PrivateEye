import { Router } from 'express';
import userRoutes from './users';
import companyRoutes from './companies';
import interviewRoutes from './interviews';
import noteRoutes from './notes';

const router = Router();

router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/interviews', interviewRoutes);
router.use('/notes', noteRoutes);

export default router;