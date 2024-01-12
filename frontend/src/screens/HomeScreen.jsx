import React from 'react'
import { Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlices'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

const HomeScreen = () => {
  const {data: products, isLoading, error} = useGetProductsQuery()
  // const [products, setProducts] = useState([])

  // useEffect(() => { 
  //     const fetchProducts = async () => {
  //     const {data} = await axios.get('/api/products')
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // },[])

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <h1>List Of Products</h1>
          <Row>
              {/* map uses {}, but we can also use other syntax. If we have multiple lines we w
              wrap it in () */}
              {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='my-3'>
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen