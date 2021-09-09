import React from 'react'
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import { Button } from "@chakra-ui/react";
import { useAuth } from '../../contexts/AuthContext'

import { useBasket } from '../../contexts/BasketContext'

function Navbar() {
    const { loggedIn } = useAuth();

    const { items } = useBasket(); //sepette o an var olan ürünleri alıyoruz.

    return (

        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to="/">eCommerce</Link>
                </div>
                <ul className={styles.menu}>
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.right}>
                {
                    !loggedIn && (
                        <>
                            <Link to="/signin">
                                <Button style={{ marginRight: 5 }} colorScheme="pink">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button colorScheme="blue">Register</Button>
                            </Link>
                        </>
                    )
                }

                {
                    loggedIn && (
                        <>
                            {
                                items.length > 0 && (
                                    <Link to="/basket">
                                        <Button colorScheme="pink" variant="outline">
                                            Basket ({items.length})
                                        </Button>
                                    </Link>
                                )
                            }
                            <Link to="/profile">
                                <Button style={{ marginRight: 5 }} >Profile</Button>
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
