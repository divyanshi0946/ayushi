import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mock data for skills and daily missions
  app.get('/api/missions', (req, res) => {
    res.json([
      { id: '1', title: 'Code Refactoring', description: 'Refactor a small function for better readability.', xp: 50, duration: '15m', category: 'Coding' },
      { id: '2', title: 'Active Listening', description: 'Practice active listening in your next conversation.', xp: 30, duration: '20m', category: 'Communication' },
      { id: '3', title: 'Mental Math', description: 'Solve 10 complex arithmetic problems in your head.', xp: 40, duration: '10m', category: 'Aptitude' },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
