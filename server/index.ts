import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const favouritesFile = path.resolve(dirname, 'favourites.json');

app.get('/api/favourites', async (_request: Request, response: Response) => {
  try {
    const data = await fs.readFile(favouritesFile, 'utf-8');
    response.json(JSON.parse(data));
  } catch {
    response.json([]);
  }
});

app.post('/api/favourites', async (request: Request, response: Response) => {
  const { imageUrl } = request.body;

  if (!imageUrl) return response.status(400).json({ error: 'imageUrl is required' });

  try {
    let favourites: string[] = [];

    try {
      const data = await fs.readFile(favouritesFile, 'utf-8');
      favourites = JSON.parse(data);
    } catch {
      // Defaults to empty list
    }

    if (!favourites.includes(imageUrl)) {
      favourites.push(imageUrl);
      await fs.writeFile(favouritesFile, JSON.stringify(favourites, null, 2));
    }

    response.status(201).json({ success: true, favourites });
  } catch {
    response.status(500).json({ error: 'Failed to update favourites' });
  }
});

app.delete('/api/favourites', async (request: Request, response: Response) => {
  const { imageUrl } = request.body;

  if (!imageUrl) return response.status(400).json({ error: 'imageUrl is required' });

  try {
    const data = await fs.readFile(favouritesFile, 'utf-8');
    let favourites: string[] = JSON.parse(data);

    favourites = favourites.filter((url: string) => url !== imageUrl);
    await fs.writeFile(favouritesFile, JSON.stringify(favourites, null, 2));

    response.json({ success: true, favourites });
  } catch {
    response.status(500).json({ error: 'Failed to update favourites' });
  }
});

app.listen(PORT, () => console.log(`Backend server is running on http://localhost:${PORT}`));
