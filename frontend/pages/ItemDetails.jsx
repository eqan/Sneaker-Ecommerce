import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../components/ItemDetail';
import fetchProduct from '../utils/api/fetchProduct';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ItemDetails() {
  let details = false;
  // const [productDetails, setProductDetails] = useState(false)
  const [loading, setIsLoading] = useState(true)
  let { id } = useParams();
  useEffect(() => {
    async function _setProductDetails() {
      details = await fetchProduct(id)
      // details = details[0]
      setIsLoading(false)
      // setProductDetails(details);
      console.log("This", ...details)
    }
    _setProductDetails();
  }, [])

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && <ItemDetail {...details} />}
    </>
  )
}
