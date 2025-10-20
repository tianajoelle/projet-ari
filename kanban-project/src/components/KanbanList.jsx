import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function KanbanList({ title }) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: 300,
        p: 2,
        m: 1,
        backgroundColor: '#f4f5f7',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      {/* Les cartes viendront ici plus tard */}
    </Paper>
  );
}
