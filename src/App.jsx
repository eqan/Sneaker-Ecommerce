import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';
import Profile from '../pages/Profile';
import Header from '../components/Header';
import NoPage from '../pages/NoPage';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import ItemDetails from '../pages/ItemDetails';
import CartPage from '../pages/CartPage';
import {CartContext} from '../utils/CartContext';
import { isAuthenticated } from '../utils/api/isAuthenticated';
import { useState, useEffect, useContext} from 'react';
import ProtectedRoute from '../utils/routes/ProtectedRoute';
import useLocalStorage from '../utils/hooks/useLocalStorage';
import './App.css'

function App() {
  const [profileData, setProfileData] = useState({});
  const {
     items, setItems, addToCart, incrementItem, decrementItem,
     getItemFromCart, removeItemFromCart,
     amountOfItemsInCart, totalCartPrice, resetCart 
    } = useLocalStorage();

  useEffect(() => {
    async function getData()
    {
        const accessToken = localStorage.getItem("access_token");
        if(accessToken)
        {
          setProfileData(await isAuthenticated(accessToken));
          if(!profileData)
          {
            setProfileData({'avatar': null})
          }
        }
        else
        {
          setProfileData({'avatar': null})
        }
        // console.log(profileData)
    }
    getData();
  }, [setProfileData])

  return (
    <div className="App">
    <BrowserRouter>
    <CartContext.Provider value={{
           items, setItems, addToCart, incrementItem,
           decrementItem, removeItemFromCart, getItemFromCart,
           amountOfItemsInCart, totalCartPrice, resetCart 
      }}>
      <Header profileImage={profileData} setProfileData={setProfileData}/>
        <Routes>
          {
            profileData ? 
            <Route index element={<Home />} />
             :
            <Route index element={<Login />} />
          }
          <Route element={<ProtectedRoute/>}>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/profile" element={<Profile />} />
          </Route>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
