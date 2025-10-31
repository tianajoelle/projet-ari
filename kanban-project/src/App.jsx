import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskEditPage from './pages/TaskEditPage';
import TaskNewPage from './pages/TaskNewPage';
import NotFound from './pages/NotFound';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const columns = ['À faire', 'En cours', 'Terminé'];

  // Charger les tâches au démarrage
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Impossible de charger les tâches. Vérifiez que json-server est lancé.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Ajouter une tâche
  async function handleAddTask(newTask) {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
    } catch (err) {
      alert('Erreur lors de la création de la tâche');
      console.error(err);
    }
  }

  // Mettre à jour une tâche
  async function handleUpdateTask(updatedTask) {
    try {
      const updated = await updateTask(updatedTask.id, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task))
      );
    } catch (err) {
      alert('Erreur lors de la mise à jour de la tâche');
      console.error(err);
    }
  }

  // Supprimer une tâche
  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      alert('Erreur lors de la suppression de la tâche');
      console.error(err);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
        <p style={{ color: 'red' }}>{error}</p>
        <p>Lancez json-server avec : <code>npm run server</code></p>
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
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            } 
          />
          <Route 
            path="task/:id" 
            element={
              <TaskDetailPage 
                tasks={tasks}
                onDelete={handleDeleteTask}
              />
            } 
          />
          <Route 
            path="edit/:id" 
            element={
              <TaskEditPage 
                tasks={tasks}
                columns={columns}
                onUpdate={handleUpdateTask}
              />
            } 
          />
          <Route 
            path="new" 
            element={
              <TaskNewPage 
                columns={columns}
                onAdd={handleAddTask}
              />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}