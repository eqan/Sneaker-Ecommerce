import React from 'react'
import PaginationComponent from '../components/Pagination';
import {useState} from 'react';
import ItemList from '../components/ItemList';


export default function Home() {
  const [products, setProducts] = useState()
  return (
    <>
      <ItemList items={products}/>
      <PaginationComponent setProducts={setProducts}/>
    </>
  )
}
