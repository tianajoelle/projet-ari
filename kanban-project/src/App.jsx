import React, { useState } from 'react';
import { Box } from '@mui/material';
import AddList from './components/AddList';
import KanbanList from './components/KanbanList';

export default function App() {
  const [lists, setLists] = useState([
    { id: 1, title: 'À faire' },
    { id: 2, title: 'En cours' },
  ]);

  const addList = (name) => {
    setLists((prev) => [...prev, { id: Date.now(), title: name }]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start'
      }}
    >
      {lists.map((list) => (
        <KanbanList key={list.id} title={list.title} />
      ))}

      {/* Formulaire d’ajout inline */}
      <AddList onCreate={addList} />
    </Box>
  );
}
