import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  TextField,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

export default function TaskNewPage({ columns, onAdd }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    statut: 'À faire'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      ...formData,
      dateCreation: new Date().toLocaleDateString('fr-FR'),
    };
    
    onAdd(newTask);
    navigate('/');
  };

  return (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Retour au tableau
      </Button>

      <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Créer une nouvelle tâche
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 3 }}
            autoFocus
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={4}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Statut initial"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            select
            fullWidth
            required
            sx={{ mb: 3 }}
          >
            {columns.map((col) => (
              <MenuItem key={col} value={col}>
                {col}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/')}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              startIcon={<AddIcon />}
            >
              Créer la tâche
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}