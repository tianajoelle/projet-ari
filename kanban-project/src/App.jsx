import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskEditPage from './pages/TaskEditPage';
import TaskNewPage from './pages/TaskNewPage';
import NotFound from './pages/NotFound';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const columns = ['À faire', 'En cours', 'Terminé'];

  // Gestion des tâches
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