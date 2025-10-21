import { Box, Switch } from '@mui/material';
import KanbanList from './components/KanbanList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BoardPage from './pages/BoardPage';
import NotFound from './pages/NotFound';


export default function App() {
 /* const lists = [
    { id: 1, title: 'À faire' },
    { id: 2, title: 'En cours' },
    { id: 3, title: 'Terminé' },
  ];*/

    /*<Box
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
    </Box>*/

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BoardPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  );
}
