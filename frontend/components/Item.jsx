import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Item = ({ _id, title, price, images, category }) => {
  const imgPath = images[0];
  const navigate = useNavigate();
  const handleNavigation = () => navigate(`/item/${_id}`);

  return (
    <Card className='animate__animated animate__fadeIn' raised>
      <CardActionArea>
        <CardMedia
          component='img'
          height='260'
          image={imgPath}
          alt={_id}
          key={_id}
          onClick={handleNavigation}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary' noWrap>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button size='small' color='error' onClick={handleNavigation}>
          {category.name}
        </Button>
        <Typography variant='subtitle2' color='text.secondary' align='right'>
          {`$${price}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Item;