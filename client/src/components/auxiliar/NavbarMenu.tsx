import {MouseEvent, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton, Menu, MenuItem} from "@mui/material";

import {NavBarOption as NavbarOption} from "../App";

export default function NavbarMenu({options}: { options: NavbarOption[]; }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const optionsToMenuItems = (opts: NavbarOption[]) =>
    opts.map((o, i) => <MenuItem key={i} onClick={e => {
      handleClose();
      o.handler(e);
    }}>{o.name}</MenuItem>);

  return (<>
    <IconButton onClick={handleClick} color="secondary">
      <MenuIcon/>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{'aria-labelledby': 'basic-button',}}
    >
      {optionsToMenuItems(options)}
    </Menu>
  </>);
}