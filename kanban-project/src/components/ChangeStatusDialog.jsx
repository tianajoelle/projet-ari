import { Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Button } from '@mui/material';

export default function ChangeStatusDialog({ open, onClose, currentStatus, columns=[], onChangeStatus }) {
  const availableColumns = columns.filter(col => col !== currentStatus);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Changer le statut</DialogTitle>
      <DialogContent>
        <List>
          {availableColumns.map(col => (
            <ListItem key={col} disablePadding>
              <ListItemButton onClick={() => onChangeStatus(col)}>
                <ListItemText primary={col} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button onClick={onClose}>Annuler</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
