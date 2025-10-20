import React, { useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';

export default function AddListButton({ onCreate }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
      setIsFormOpen(false);
    }
  };

  return (
    <>
    {/* Onclick, on ouvre le formmulaire d'ajout */}
      {isFormOpen ? (
        <Paper
          elevation={2}
          sx={{
            width: 300,
            p: 2,
            m: 1,
            backgroundColor: '#fff',
            borderRadius: 2,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Nom de la liste"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              size="small"
              onClick={() => setIsFormOpen(false) && setName('')}
              sx={{ mr: 1 }}
            >
              Annuler
            </Button>
            <Button type="submit" variant="contained" size="small">
              Valider
            </Button>
          </Box>
        </Paper>
      ) : (
        <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
          sx={{ height: 'fit-content', m: 1 }}
        >
          + Ajouter une liste
        </Button>
      )}
    </>
  );
}
