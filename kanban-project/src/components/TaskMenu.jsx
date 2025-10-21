import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TaskMenu({ onEdit, onDelete, onChangeStatus }) {
  const [anchorEl, setAnchorEl] = useState(null); // ✅ nom correct : anchorEl
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl} // ✅ prop correcte
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleMenuClose();
          }}
        >
          Modifier
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            handleMenuClose();
          }}
        >
          Supprimer
        </MenuItem>
        <MenuItem
          onClick={() => {
            onChangeStatus?.();
            handleMenuClose();
          }}
        >
          Changer de statut
        </MenuItem>
      </Menu>
    </>
  );
}
