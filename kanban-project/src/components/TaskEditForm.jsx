import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function TaskEditForm({ task, onCancel, onSave }) {
  const [editedTask, setEditedTask] = useState({
    titre: task.titre,
    description: task.description,
  });

  function handleChange(e){
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e){
    e.preventDefault();
    onSave({ ...task, ...editedTask });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <TextField
        label="Titre"
        name="titre"
        value={editedTask.titre}
        onChange={handleChange}
        size="small"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={editedTask.description}
        onChange={handleChange}
        size="small"
        multiline
        minRows={2}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button size="small" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" size="small" variant="contained">
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
}
