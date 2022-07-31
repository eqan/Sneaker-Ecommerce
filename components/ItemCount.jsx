import React from 'react';
import { useCounter } from '../utils/hooks/useCounter';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ItemCount = ({id, image, title, price, initial, onAdd}) => {

  const [ quantity, increment, decrement ] = useCounter(parseInt(initial));
  console.log(quantity)

  const handleAddBtnClick = () => {
     onAdd({id, title, image, price, quantity});
     toast.success("Items in cart updated!");
  };

  return (
    <Box>
        <FormControl
          sx={{
            m: 1,
            width: '11ch',
          }}
          variant='outlined'
        >
          <Box display='block'>
          <IconButton
            aria-label='addButton'
            onClick={increment}
          >
            <AddIcon />
          </IconButton>
          
          <OutlinedInput
            id='outlined-adornment-weight'
            endAdornment={<InputAdornment position='end'></InputAdornment>}
            aria-describedby='outlined-weight-helper-text'
            type='number'
            width="100px"
            inputProps={{
              'aria-label': 'weight',
              value: quantity >= 0 && quantity,
              type: 'number',
              max: 10,
              min: 1
            }}
          />
          <IconButton
            aria-label='removeButtom'
            onClick={decrement}
          >
            <RemoveIcon />
          </IconButton>
            </Box>
          
        </FormControl>
        <div>
        <Button
        aria-label='addToCart'
        variant='outlined'
        color='inherit'
        startIcon={<ShoppingCartIcon />}
        sx={{ mt: 1 }}
        onClick={handleAddBtnClick}
      >
        Checkout
      </Button>
          </div>
      
      <ToastContainer/>
    </Box>
  );
};

export default ItemCount;
