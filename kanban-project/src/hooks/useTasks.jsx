import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

/**
 * Hook personnalisé pour gérer les tâches avec l'API
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les tâches au montage
  useEffect(() => {
    loadTasks();
  }, []);

  // Fonction pour charger toutes les tâches
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
  async function addTask(newTask) {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
      return createdTask;
    } catch (err) {
      console.error('Erreur lors de la création de la tâche:', err);
      throw err;
    }
  }

  // Mettre à jour une tâche
  async function modifyTask(updatedTask) {
    try {
      const updated = await updateTask(updatedTask.id, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id == updated.id ? updated : task))
      );
      return updated;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la tâche:', err);
      throw err;
    }
  }

  // Supprimer une tâche
  async function removeTask(taskId) {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id != taskId));
    } catch (err) {
      console.error('Erreur lors de la suppression de la tâche:', err);
      throw err;
    }
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    modifyTask,
    removeTask,
  };
}