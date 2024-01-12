import React from 'react'
// React hook used to return an object of key/value pairs of the dynamic params from the URL.
// import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
// import axios from 'axios'
import { useGetProductDetailsQuery } from '../slices/productApiSlices'

const ProductScreen = () => {
    // const [product, setProduct] = useState({})

    const {id:productId} = useParams()

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const {data} = await axios.get(`/api/products/${productId}`)
    //         setProduct(data)
    //     }
    //     fetchProduct()
    // }, [productId])
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId)

  return (
    <>
        {/* Creates a Link to the parent route */}
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>

        {isLoading ? (
            <h2>Loading...</h2>
        ) : error ? (
            <div>{error?.data?.message || error.error}</div>
        ) : (
            <>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={4}>
                        {/* List groups are a flexible and powerful component for displaying a series of content. 
                        You can Modify and extend them to support just about any content within */}
                        {/* variant='flush' is used to remove outer borders and rounded corners to render list 
                        group items edge-to-edge in a parent container */}
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: Rs {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>Rs {product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )}
    </>
    )
}

export default ProductScreen