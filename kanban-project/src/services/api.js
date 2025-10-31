const API_URL = 'http://localhost:3001/tasks';

// GET - Récupérer toutes les tâches
export async function getTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erreur lors de la récupération des tâches');
    return await response.json();
  } catch (error) {
    console.error('Erreur getTasks:', error);
    throw error;
  }
}

// GET - Récupérer une tâche par ID
export async function getTaskById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération de la tâche');
    return await response.json();
  } catch (error) {
    console.error('Erreur getTaskById:', error);
    throw error;
  }
}

// POST - Créer une nouvelle tâche
export async function createTask(task) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Erreur lors de la création de la tâche');
    return await response.json();
  } catch (error) {
    console.error('Erreur createTask:', error);
    throw error;
  }
}

// PUT - Mettre à jour une tâche
export async function updateTask(id, task) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour de la tâche');
    return await response.json();
  } catch (error) {
    console.error('Erreur updateTask:', error);
    throw error;
  }
}

// DELETE - Supprimer une tâche
export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de la tâche');
    return true;
  } catch (error) {
    console.error('Erreur deleteTask:', error);
    throw error;
  }
}