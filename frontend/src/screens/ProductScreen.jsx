import React from 'react'
// React hook used to return an object of key/value pairs of the dynamic params from the URL.
// import { useEffect, useState } from 'react'
import {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form,Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productApiSlices'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-toastify'

const ProductScreen = () => {
    // const [product, setProduct] = useState({})

    const {id:productId} = useParams()

    // Initializing the useDispatch and useNavigate hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const {data} = await axios.get(`/api/products/${productId}`)
    //         setProduct(data)
    //     }
    //     fetchProduct()
    // }, [productId])
    const {data: product, refetch, isLoading, error} = useGetProductDetailsQuery(productId)

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()

    const { userInfo } = useSelector(state => state.auth)

    const addToEventHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await createReview({productId, rating, comment})
            refetch()
            toast.success('Review Submitted')
            setRating(0)
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }

    }

  return (
    <>
        {/* Creates a Link to the parent route */}
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>

        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message>{error?.data?.message || error.error}</Message>
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
                                Price: <span>&#8377;</span>{(product.price).toLocaleString('en-IN')}
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
                                        <Col><strong><span>&#8377;</span>{(product.price).toLocaleString('en-IN')}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {/* This piece of code adds the blank space where we can choose the quantity */}
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                    {
                                                        // Using the spread operator to create an array of numbers from 1 to the maximum number of items in stock
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToEventHandler}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row className='review'>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {loadingProductReview && <Loader />}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment' className='my-2'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button disabled={loadingProductReview} type='submit' variant='primary'>
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                                )
                            }
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
        )}
    </>
    )
}

export default ProductScreen