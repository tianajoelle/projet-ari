import { Box } from '@mui/material';
import KanbanList from './components/KanbanList';

export default function App() {
  const lists = [
    { id: 1, title: 'À faire' },
    { id: 2, title: 'En cours' },
    { id: 3, title: 'Terminé' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        p: 2,
        overflowX: 'auto',
      }}
    >
      {lists.map((list) => (
        <KanbanList key={list.id} title={list.title} />
      ))}
    </Box>
  );
}
