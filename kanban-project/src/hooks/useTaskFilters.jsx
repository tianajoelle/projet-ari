import { useState, useMemo } from 'react';

/**
 * Hook personnalisé pour gérer le filtrage des tâches
 */
export function useTaskFilters(tasks) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filtrage des tâches avec useMemo pour optimiser les performances
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.statut === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, filterStatus]);

  // Regrouper les tâches par statut
  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.statut === status);
  };

  return {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filteredTasks,
    getTasksByStatus,
  };
}