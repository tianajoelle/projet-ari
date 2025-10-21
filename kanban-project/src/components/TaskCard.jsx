import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TaskMenu from './TaskMenu';
import TaskEditForm from './TaskEditForm';
import ChangeStatusDialog from './ChangeStatusDialog';

export default function TaskCard({ task, onUpdate, onDelete, columns=[] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1,
        backgroundColor: '#fff',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        {!isEditing ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {task.titre}
              </Typography>
              <TaskMenu
                onEdit={() => setIsEditing(true)}
                onDelete={() => onDelete(task)}
                onChangeStatus={() => setOpenDialog(true)}
              />
              <ChangeStatusDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                currentStatus={task.statut}
                columns={columns}
                onChangeStatus={(newStatus) => {
                onUpdate({ ...task, statut: newStatus });
                setOpenDialog(false);
                }}
            />
            </Box>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {task.description}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mt: 1 }}
            >
              Créée le {task.dateCreation}
            </Typography>
          </>
        ) : (
          <TaskEditForm
            task={task}
            onCancel={() => setIsEditing(false)}
            onSave={(updatedTask) => {
              onUpdate(updatedTask);
              setIsEditing(false);
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
