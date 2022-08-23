import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GoBackBtn from "./GoBackBtn";
import { useEffect } from "react";
import { fetchAvatar } from "../utils/api/fetchAvatar";


function Navbar({ accessToken, profileData, setProfileData }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImage, setProfileImage] = useState(false);

  useEffect(() => {
    async function setAvatar() {
      if (profileData) {
        console.log(profileData['_id'])
        setProfileImage(await fetchAvatar(accessToken, profileData['_id']));
      }
    }
    setAvatar();
    console.log(profileData)
  }, [])


  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <nav className={styles.nav} style={{ justifyContent: "space-between", paddingLeft: "2", paddingRight: "2" }}>
      <div style={{ marginLeft: '3rem', marginRight: '3rem  ' }}>
        <GoBackBtn />
      </div>

      <Box className={styles.left}>

        <p style={{ fontFamily: "Logo", fontSize: "1rem" }}>Sneakers</p>
        <ul style={{ fontFamily: "PoppinsThin" }} className={styles.list}>
          <Link to='/home' style={{ textDecoration: "none", color: "black" }}><li>Home</li></Link>
          <Link to='/Cart' style={{ textDecoration: "none", color: "black" }}><li>Cart</li></Link>
          <Link to='/profile' style={{ textDecoration: "none", color: "black" }}><li>Profile</li></Link>
          <Link to='/about' style={{ textDecoration: "none", color: "black" }}><li>About</li></Link>
          {
            !profileImage ?
              <div style={{ display: "flex" }}>
                <Link to='/signup' style={{ textDecoration: "none", color: "black" }}><li>SignUp</li></Link>
                <Link to='/login' style={{ textDecoration: "none", color: "black" }}><li>Login</li></Link>
              </div>
              : <li></li>
          }
        </ul>
      </Box>
      <Box style={{ display: "flex", justifyContent: "flex-end" }} className={styles.avatar}>
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
            <ShoppingCartIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileImage(false);
              localStorage.removeItem('access_token');
              localStorage.removeItem('cart');
              setProfileData(null);
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
              src={profileImage}
              width="40"
              className={styles.cart}
            />
            :
            <img
              width="40"
              className={styles.cart}
            />
        }
      </Box>

    </nav>
  );
}
export default Navbar;