import ItemDescription from './ItemDescription';
import ItemCount from './ItemCount';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import GoBackBtn from './GoBackBtn';
import { CartContext } from '../utils/CartContext';
import {useState, useContext, useEffect} from 'react';


const ItemDetail = ({ id, title, description, price, images }) => {
  const imgPath = images;
  const [initialQuantity, setInitialQuantity] = useState(0)
  const {getItemFromCart, addToCart} = useContext(CartContext);

  useEffect(() => {
    const itemData = getItemFromCart(id);
    if(itemData)
    {
      setInitialQuantity(parseInt(itemData['quantity']));
    }
  }, [])
  

  return (
    <>
    <div flexDirection="row">
    </div>
      <Grid
        container
        mt={5}
        className='animate__animated animate__fadeIn'
        spacing={3}
      >
        <Grid
          item
          sm={6}
          md={4}
          className='animate__animated animate__fadeInLeft'
        >
          <Card raised sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center"
          }} >
            <CardMedia sx={{
              maxWidth: '400px',
              width: "100%"
            }} component='img' image={imgPath[0]} alt={id} />
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              margin: '10px'
            }}>

              <CardMedia sx={{
                minWidth: '100px',
                width: "300px"
              }} component='img' image={imgPath[1]} alt={id} />
              <CardMedia sx={{
                minWidth: '100px',
                width: "300px"
              }} component='img' image={imgPath[2]} alt={id} />
            </Box>
          </Card>
          <Box
            display='flex'
            justifyContent='space-between'
            mt={1}
            alignContent='center'
          >

          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Box sx={{
            borderRadius:'10px',
            boxShadow:'0 0 4px rgb(0,0,0)',
            padding:'2rem'

          }}>

          <Typography variant='h3' component='h3'>
            {title}
          </Typography>
          
              <ItemDescription characteristics={description} />
              <Typography component='h5' variant='h6' textAlign='center'>
                Price: ${price}
              </Typography>
              <ItemCount id={id} title={title} image={images[0]} price={price} initial={initialQuantity} onAdd={addToCart}/>
            </Box>
          
        </Grid>
      </Grid>
    </>
  );
};

export default ItemDetail;