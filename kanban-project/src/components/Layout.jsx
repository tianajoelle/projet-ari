import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <ViewKanbanIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kanban Board
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenu principal */}
      <Container 
        maxWidth={false} 
        sx={{ 
          flex: 1, 
          py: 3,
          backgroundColor: '#f5f5f5'
        }}
      >
        <Outlet />
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          textAlign: 'center', 
          backgroundColor: '#fff',
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Kanban Project © 2025
        </Typography>
      </Box>
    </Box>
  );
}