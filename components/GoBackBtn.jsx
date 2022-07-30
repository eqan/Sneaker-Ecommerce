import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackBtn = () => {
  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);

  return (
    <Button disableRipple sx={{padding:'0'}} startIcon={<ArrowBackIcon />} onClick={handleReturn}>
      Back
    </Button>
  );
};
export default GoBackBtn;
