// Code for only the header component
import React from 'react';
import logo from '../assets/logo.png'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutUser] = useLogoutMutation()

    const logOutHandler = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt='Proshop'></img>
                        Proshop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/>Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg='success'>
                                        {cartItems.reduce((acc,count)=> acc+count.qty,0)}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logOutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link><FaUser/>Sign In</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header