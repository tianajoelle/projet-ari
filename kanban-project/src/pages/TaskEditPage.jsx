import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  TextField,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

export default function TaskEditPage({ tasks, columns, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const task = tasks.find(t => t.id == id);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    statut: 'À faire'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        titre: task.titre,
        description: task.description,
        statut: task.statut
      });
    }
  }, [task]);

  if (!task) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Tâche introuvable
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Retour au tableau
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...task, ...formData });
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
          Modifier la tâche
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
            label="Statut"
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
              startIcon={<SaveIcon />}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}