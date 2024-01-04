import React from 'react'
import {Row,Col} from 'react-bootstrap'    
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
        <h1>List Of Products</h1>
        <Row>
            {/* map uses {}, but we can also use other syntax. If we have multiple lines we w
            wrap it in () */}
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen