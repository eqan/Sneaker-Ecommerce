import React, { useState } from "react";
import "../styles/Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GoBackBtn from "./GoBackBtn";


function Navbar({profileImage, setProfileData}) {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    
    <nav style={{justifyContent:"space-between", paddingLeft:"2", paddingRight:"2" }}>
      <div style={{marginLeft:'3rem' , marginRight:'3rem  '}}>
        <GoBackBtn/>
      </div>
      
      <Box className="left">        

      <p style={{fontFamily: "Logo", fontSize: "1rem"}}>Sneakers</p>
        <ul style={{fontFamily: "PoppinsThin"}} className="list">
          <Link to='/home' style={{textDecoration: "none", color: "black"}}><li>Home</li></Link>
          <Link to='/Cart' style={{textDecoration: "none", color: "black"}}><li>Cart</li></Link>
          <Link to='/profile' style={{textDecoration: "none", color: "black"}}><li>Profile</li></Link>
          <Link to='/about' style={{textDecoration: "none", color: "black"}}><li>About</li></Link>
        </ul>
      </Box>
      <Box style={{display: "flex", justifyContent: "flex-end"}} className="avatar">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/cart");
            }}
          >
           <ShoppingCartIcon/>
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem('access_token');
              setProfileData({'avatar': null})
              navigate("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        {
        profileImage ?
        <img
          onClick={handleClick}
          src={profileImage['avatar']}
          width="40"
          className="cart"
        />
        : 
        <img
          width="40"
          className="cart"
        />
        }
      </Box>
      
    </nav>
  );
}
export default Navbar;