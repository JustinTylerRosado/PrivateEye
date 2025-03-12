import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './config/database';
import companyRoutes from './routes/api/companies';
import userRoutes from './routes/api/users';
import interviewRoutes from './routes/api/interviews';
import noteRoutes from './routes/api/notes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});