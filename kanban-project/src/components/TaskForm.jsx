import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function TaskForm({ statut, onCancel, onValidate }) {
  const [task, setTask] = useState({
    titre: '',
    description: '',
  });

  function handleChange(e){
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e){
    e.preventDefault();

    // On complète la tâche avec statut + date ici
    const completeTask = {
      ...task,
      statut,
      dateCreation: new Date().toLocaleDateString(),
    };

    onValidate(completeTask);
    // Réinitialisation du formulaire
    setTask({ titre: '', description: '' });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mt: 1,
        backgroundColor: '#fff',
        p: 1,
        borderRadius: 1,
      }}
    >
      <TextField
        label="Titre"
        name="titre"
        value={task.titre}
        onChange={handleChange}
        size="small"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        size="small"
        multiline
        minRows={2}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button size="small" onClick={onCancel} sx={{ color: 'text.secondary' }}>
          Annuler
        </Button>
        <Button type="submit" variant="contained" size="small">
          Valider
        </Button>
      </Box>
    </Box>
  );
}
