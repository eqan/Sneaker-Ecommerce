import Item from './Item';

import Grid from '@mui/material/Grid';

const ItemList = ({ items }) => (
  <>
    <Grid container spacing={4} py={3}>
      {items && items.map((item) => (
        <Grid item xs={12} sm={6} lg={3} key={item.id}>
          <Item {...item} />
        </Grid>
      ))}
    </Grid>
  </>
);

export default ItemList;
