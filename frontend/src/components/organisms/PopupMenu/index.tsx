'use client';

import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { ReactElement, ReactNode, cloneElement, useState } from 'react';

interface TriggerProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface MenuItemProps {
  icon?: ReactElement;
  children: ReactNode;
  onClick?: () => void;
}

function CustomMenuItem({ icon, children, onClick }: MenuItemProps) {
  return (
    <MenuItem onClick={onClick} sx={{ minWidth: 200, py: 1 }}>
      {icon && <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
}

interface PopupMenuProps {
  trigger: ReactElement<TriggerProps>;
  children: ReactNode;
}

export function PopupMenu({ trigger, children }: PopupMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {cloneElement(trigger, {
        onClick: handleClick,
      })}
      <Menu
        id="popup-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: {
              mt: 1,
              '& .MuiList-root': {
                py: 0.5,
              },
            },
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
}

PopupMenu.Item = CustomMenuItem;
