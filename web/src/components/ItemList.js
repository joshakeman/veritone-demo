import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function ItemList({ items, deleteItem }) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {items.map((item) => {
        const labelId = `checkbox-list-label-${item}`;

        return (
          <ListItem
            key={item.uuid}
            secondaryAction={
              <IconButton onClick={() => deleteItem(item.uuid)}edge="end" aria-label="comments">
                {/* <ModeEditIcon /> */}
                <DeleteOutlineIcon />
              </IconButton>
            }
            sx={{
                border: '1px solid lightgray',
                borderRadius: '6px',
                margin: '10px auto'
            }}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item.name)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(item.name) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} primaryTypographyProps={{variant:"h6"}} secondaryTypographyProps={{variant:"body2"}} secondary={<ListItemText >{item.description}</ListItemText>} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
