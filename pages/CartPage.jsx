import { useState, useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { CartContext } from '../utils/CartContext';

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const { items, removeItemFromCart, totalCartPrice, amountOfItemsInCart } = useContext(CartContext);

  useEffect(()=>
  {
    setTotalPrice(totalCartPrice());
    setTotalItems(amountOfItemsInCart());
  }, [items])

  return(
    <>
      <h2>{`NumberOf Items In Cart (${totalItems})`}</h2>
      <hr />
      <br />
      {items.length > 0 ? (
        <>
          <Container className='animate__animated animate__fadeIn'>
            {items.map((item) => (
              <Fragment key={item.id}>
                <CartItem {...item} removeItemFromCart={removeItemFromCart} />
                <Divider variant='middle' sx={{ my: 3 }} />
              </Fragment>
            ))}
          </Container>


          <Typography
            variant='h6'
            align='right'
            className='animate__animated animate__fadeInUp'
          >
            Total: {'$' + totalPrice}
          </Typography>

          <Box display='flex' gap justifyContent={'center'} my>
            <Button
              variant='contained'
              color='error'
              component={Link}
              to='/checkout'
              startIcon={<PointOfSaleIcon />}
            >
              Commit Transaction
            </Button>
          </Box>

        </>
      ) : (
        <EmptyCart />
      )} 
   
    </>
  );
};