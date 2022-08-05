import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../components/ItemDetail';
import fetchProduct from '../utils/api/fetchProduct';

export default function ItemDetails() {
  const [productDetails, setProductDetails] = useState(false)
  let {id} = useParams();
  useEffect(() => {
    async function _setProductDetails()
    {
        setProductDetails(await fetchProduct(id));
        console.log(productDetails)
    }
    _setProductDetails();
  }, [])
  
  return (
    <>
        {productDetails && <ItemDetail {...productDetails}/>}
    </>
  )
}
