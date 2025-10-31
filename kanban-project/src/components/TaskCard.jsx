import { useState } from 'react';
import { Paper, Typography, Button, Box, Chip } from '@mui/material';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';

export default function KanbanList({ 
  title, 
  tasks = [], 
  columns = [], 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask 
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddTask = (task) => {
    const newTask = {
      titre: task.titre,
      description: task.description,
      statut: title,
      dateCreation: new Date().toLocaleDateString('fr-FR'),
    };
    onAddTask(newTask);
    setIsFormOpen(false);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        minWidth: 320,
        width: 320,
        p: 2,
        backgroundColor: '#f4f5f7',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 200px)',
      }}
    >
      {/* En-tête de la liste */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="600">
          {title}
        </Typography>
        <Chip 
          label={tasks.length} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>

      {/* Liste des tâches avec scroll */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={() => onDeleteTask(task.id)}
            columns={columns}
          />
        ))}

        {/* Formulaire uniquement pour "À faire" */}
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

      {/* Bouton ajouter (uniquement pour "À faire") */}
      {title === 'À faire' && !isFormOpen && (
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={() => setIsFormOpen(true)}
          sx={{ mt: 'auto' }}
        >
          + Ajouter une tâche
        </Button>
      )}
    </Paper>
  );
}