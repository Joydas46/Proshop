import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    // card tags in react bootstrap
    <Card>
        {/* Link to the product, which will be triggered on clicking the image */}
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
        </Link>
        <Card.Body>
            {/* Link to the product which willbe tiggered on clicking the title */}
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div' className='product-title card-title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>
            <Card.Text as='h3'>
                <span>&#8377;</span>{(product.price).toLocaleString('en-IN')}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product