import React, { useState } from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';

export default function KanbanList({ title, columns=[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    const newTask = {
      id: Date.now(),
      titre: task.titre,
      description: task.description,
      statut: title,
      dateCreation: new Date().toLocaleDateString(),
    };
    setTasks((prev) => [...prev, newTask]);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: 300,
        p: 2,
        m: 1,
        backgroundColor: '#f4f5f7',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {/* Liste des tâches */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            columns={columns}
          />
        ))}

        {/* Formulaire uniquement pour la liste “À faire” */}
        {title === 'À faire' && isFormOpen && (
          <Box sx={{ mt: 1 }}>
            <TaskForm
              statut={title}
              onCancel={() => setIsFormOpen(false)}
              onValidate={handleAddTask}
            />
          </Box>
        )}
      </Box>

      {/* Bouton ajouter visible seulement sur “À faire” */}
      {title === 'À faire' && !isFormOpen && (
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={() => setIsFormOpen(true)}
        >
          + Ajouter une tâche
        </Button>
      )}
    </Paper>
  );
}
