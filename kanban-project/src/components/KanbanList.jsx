import { Paper, Typography, Box, Chip } from '@mui/material';
import TaskCard from './TaskCard';

export default function KanbanList({ 
  title, 
  tasks = [], 
  columns = [], 
  onUpdateTask, 
  onDeleteTask 
}) {
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
        {tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            Aucune tâche
          </Typography>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={() => onDeleteTask(task.id)}
              columns={columns}
            />
          ))
        )}
      </Box>
    </Paper>
  );
}