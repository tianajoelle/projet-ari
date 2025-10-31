import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Chip,
  Divider 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskDetailPage({ tasks, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const taskId = id;
  const task = tasks.find(t => t.id == taskId);


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

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      onDelete(task.id);
      navigate('/');
    }
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
        {/* En-tête */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom fontWeight="600">
              {task.titre}
            </Typography>
            <Chip 
              label={task.statut} 
              color={
                task.statut === 'Terminé' ? 'success' : 
                task.statut === 'En cours' ? 'primary' : 
                'default'
              }
              sx={{ mt: 1 }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              Modifier
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Détails */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {task.description || 'Aucune description'}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Date de création
          </Typography>
          <Typography variant="body1">
            {task.dateCreation}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}