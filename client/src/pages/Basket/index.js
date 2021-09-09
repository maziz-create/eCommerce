import { useBasket } from '../../contexts/BasketContext'

import { useState, useEffect, useRef } from 'react'

import { Link } from 'react-router-dom'

import {
    Alert,
    Text,
    Image,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    Textarea,
    FormControl
} from '@chakra-ui/react'
import { postOrder } from '../../api';

function Basket() {
    //for modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(); //açıldığında inputa focuslanması için.

    //sipariş verebilmek için adres yazılacak, yazılan adresi state'e atayacağız.
    const [address, setAddress] = useState("");
    //modal için save butonuna bastığımızdaki action kısmını hazırlıyoruz.
    const handleSubmitForm = async () => {
        // console.log("submit button");

        //sepete eklenen ürünlerin Id'lerini ayarlamalıyız.
        const itemIds = items.map((item) => item._id);

        //backend input bekliyor. onu hazırlayacağız.
        const input = {
            address,
            items: JSON.stringify(itemIds),
        }

        const responseOrder = await postOrder(input);
        emptyBasket();
        onClose();


        console.log(itemIds);
        console.log(responseOrder);
    }

    //for basket(items state came from BasketContext)
    const { items, removeFromBasket, emptyBasket } = useBasket();
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

                        <Button mt="2" size="sm" colorScheme="pink" onClick={onOpen}>Order</Button>

                        <Modal
                            initialFocusRef={initialRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Create your account</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <Textarea
                                            ref={initialRef}
                                            placeholder="Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </>
                )
            }

        </Box>
    )
}

export default Basket
