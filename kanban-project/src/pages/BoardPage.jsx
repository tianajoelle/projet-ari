import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanList from '../components/KanbanList';

export default function BoardPage({ tasks, columns, onUpdateTask, onDeleteTask }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filtrage des tâches
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.statut === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Regrouper les tâches par statut
  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.statut === status);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Barre de recherche et filtres */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          label="Rechercher une tâche..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 250, maxWidth: 400, backgroundColor: '#fff' }}
        />
        
        <FormControl size="small" sx={{ minWidth: 150, backgroundColor: '#fff' }}>
          <InputLabel>Filtrer par statut</InputLabel>
          <Select
            value={filterStatus}
            label="Filtrer par statut"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">Tous</MenuItem>
            {columns.map(col => (
              <MenuItem key={col} value={col}>{col}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/new')}
        >
          Nouvelle tâche
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {filteredTasks.length} / {tasks.length} tâche(s)
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
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </Box>
    </Box>
  );
}