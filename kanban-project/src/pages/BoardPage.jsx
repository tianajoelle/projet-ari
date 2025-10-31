import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import KanbanList from '../components/KanbanList';

export default function BoardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);

  // Colonnes du Kanban
  const columns = ['À faire', 'En cours', 'Terminé'];

  // Fonctions de gestion des tâches
  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, { ...newTask, id: Date.now() }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Filtrage des tâches
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Regrouper les tâches par statut
  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.statut === status);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Barre de recherche */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Rechercher une tâche..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: 400, backgroundColor: '#fff' }}
        />
        <Typography variant="body2" color="text.secondary">
          {tasks.length} tâche(s) au total
        </Typography>
      </Box>

      {/* Colonnes Kanban */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
        }}
      >
        {columns.map((column) => (
          <KanbanList
            key={column}
            title={column}
            tasks={getTasksByStatus(column)}
            columns={columns}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </Box>
    </Box>
  );
}