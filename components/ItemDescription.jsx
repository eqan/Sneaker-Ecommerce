import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

const ItemDescription = ({ characteristics }) => (
  <Paper elevation={8}  sx={{ my: 3 }}>
    <List>
      <h5>{characteristics}</h5>
    </List>
  </Paper>
);

export default ItemDescription;
