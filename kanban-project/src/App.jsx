import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskEditPage from './pages/TaskEditPage';
import TaskNewPage from './pages/TaskNewPage';
import NotFound from './pages/NotFound';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const columns = ['À faire', 'En cours', 'Terminé'];
  
  // Utilisation du hook personnalisé
  const {
    tasks,
    loading,
    error,
    addTask,
    modifyTask,
    removeTask,
  } = useTasks();

  // Écran de chargement
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="body1" color="text.secondary">
          Chargement des tâches...
        </Typography>
      </Box>
    );
  }

  // Écran d'erreur
  if (error) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh', 
          flexDirection: 'column', 
          gap: 2,
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          ⚠️ Erreur de connexion
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
        <Box 
          sx={{ 
            mt: 2, 
            p: 2, 
            backgroundColor: '#f5f5f5', 
            borderRadius: 1,
            fontFamily: 'monospace'
          }}
        >
          <Typography variant="body2">
            💡 Lancez json-server avec : <strong>npm run server</strong>
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
              <BoardPage 
                tasks={tasks}
                columns={columns}
                onUpdateTask={modifyTask}
                onDeleteTask={removeTask}
              />
            } 
          />
          <Route 
            path="task/:id" 
            element={
              <TaskDetailPage 
                tasks={tasks}
                onDelete={removeTask}
              />
            } 
          />
          <Route 
            path="edit/:id" 
            element={
              <TaskEditPage 
                tasks={tasks}
                columns={columns}
                onUpdate={modifyTask}
              />
            } 
          />
          <Route 
            path="new" 
            element={
              <TaskNewPage 
                columns={columns}
                onAdd={addTask}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}