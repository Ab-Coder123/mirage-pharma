import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { brandColors } from '@mirage/config';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'optimal',
    timestamp: new Date().toISOString(),
    primaryColor: brandColors.primary.DEFAULT,
  });
});

app.listen(port, () => {
  console.log(`[Mirage Backend] Server running on port ${port}`);
});
