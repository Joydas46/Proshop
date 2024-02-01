import React,{useEffect} from 'react'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Link, useParams} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice'

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation()
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    const {data: payPal, isLoading: loadingPayPal, isError: errorPayPal} = useGetPayPalClientIdQuery()
    const {userInfo} = useSelector((state) => state.auth)

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && payPal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': payPal.clientId,
                        currency: 'IND',
                    },
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript()
                }
            }
        }
    }, [errorPayPal, loadingPayPal, payPal, order, paypalDispatch])

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'/>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{order.user.email}
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <Message variant='success'>
                            Delivered on {order.deliveredAt}
                        </Message>
                    ) : (
                        <Message variant='danger'>Not Delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>
                            Paid on {order.paiAt}
                        </Message>
                    ) : (
                        <Message variant='danger'>Not Paid</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fluid
                                        rounded
                                    />
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x <span>&#8377;</span>{item.price} = <span>&#8377;</span>{item.qty * item.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup.Item>
            </ListGroup>    
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col><span>&#8377;</span>{order.itemsPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Shipping</Col>
                            <Col><span>&#8377;</span>{order.shippingPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Tax</Col>
                            <Col><span>&#8377;</span>{order.taxPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Total</Col>
                            <Col><span>&#8377;</span>{order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {/* Pay Order Placeholder */}
                    {/* Mark Order as Delivered */}
                </ListGroup>
            </Card>    
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen