import { useBasket } from '../../contexts/BasketContext'

import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Alert, Text, Image, Button, Box } from '@chakra-ui/react'

function Basket() {
    const { items, removeFromBasket } = useBasket();
    console.log("items =>", items);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(items));
}, [items])

//ürünlerin toplam fiyatını hesaplıyoruz. En sondaki sıfır başlangıç değer.
const total = items.reduce((acc, obj) => acc + obj.price, 0); //acc => o ana kadarki toplam.

return (
    <Box p="5">
        {
            items.length < 1 && <Alert fontSize="18" py="5" status="warning">
                <Text fontWeight="bold" style={{ marginLeft: "auto", marginRight: "auto" }}>Sepette ürün yok!</Text>
            </Alert>
        }

        {
            items.length > 0 && (
                <>
                    <ul>
                        {
                            items.map((item) => {
                                return <li style={{ marginBottom: 35 }} key={item._id}>
                                    <Link to={`/product/${item._id}`}>
                                        {item.title} - {item.price} TL
                                        <Image 
                                        style={{ marginTop: 7, display: 'inline-block' }} 
                                        htmlWidth={200} src={item.photos[0]} 
                                        alt="Basket item" 
                                        loading="lazy"
                                        />
                                    </Link>

                                    <Button mt="2" size="sm" colorScheme="pink" onClick={() => removeFromBasket(item._id)}>
                                        Remove From Basket
                                    </Button>
                                </li>
                            })
                        }
                    </ul>

                    <Box mt="10">
                        <Text fontSize="22">
                            Total: {total} TL
                        </Text>
                    </Box>
                </>
            )
        }

    </Box>
)
}

export default Basket
