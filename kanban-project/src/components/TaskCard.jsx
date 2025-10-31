import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ChangeStatusDialog from './ChangeStatusDialog';

export default function TaskCard({ task, onUpdate, onDelete, columns = [] }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Supprimer la tâche "${task.titre}" ?`)) {
      onDelete();
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1,
        backgroundColor: '#fff',
        borderRadius: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ flex: 1 }}>
            {task.titre}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Voir les détails">
              <IconButton 
                size="small" 
                onClick={() => navigate(`/task/${task.id}`)}
                color="primary"
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Changer de statut">
              <IconButton 
                size="small" 
                onClick={() => setOpenDialog(true)}
                color="info"
              >
                <SwapHorizIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Supprimer">
              <IconButton 
                size="small" 
                onClick={handleDelete}
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            color: 'text.secondary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {task.description || 'Aucune description'}
        </Typography>
        
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', display: 'block', mt: 1 }}
        >
          Créée le {task.dateCreation}
        </Typography>

        <ChangeStatusDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          currentStatus={task.statut}
          columns={columns}
          onChangeStatus={(newStatus) => {
            onUpdate({ ...task, statut: newStatus });
            setOpenDialog(false);
          }}
        />
      </CardContent>
    </Card>
  );
}