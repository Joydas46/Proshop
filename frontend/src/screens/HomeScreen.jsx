import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlices'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

// import { useEffect, useState } from 'react'
// import axios from 'axios'

const HomeScreen = () => {
  const {pageNumber} = useParams()
  const {data, isLoading, error} = useGetProductsQuery({pageNumber})
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
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>List Of Products</h1>
          <Row>
              {/* map uses {}, but we can also use other syntax. If we have multiple lines we w
              wrap it in () */}
              {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='my-3'>
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
          <Paginate pages={data.pages} page={data.page}/>
        </>
      )}
    </>
  )
}

export default HomeScreen