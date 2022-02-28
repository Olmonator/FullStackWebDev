import express from 'express';
import entryService from '../services/entryService'

const router = express.Router();

router.post('/api/patients/:id/entries', (req, res) => {
  try {
    const entry = req.body
    const newEntry = entryService.addEntry(entry, req.params.id);    
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;