import { Box, Image, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function Card({ item }) {
    /*
    createdAt ' taki tüm tarih bilgisini gün/ay/yıl şekline getirdim. Fakat bu çözümü kullanmayacağız.
    Bunun yerine momentjs diye bir araç var, düzensiz tarihleri istenilen şekilde gösteriyor. Onu kurup kullandık.

        let splitedDate = item.createdAt.split(""); //harf harf dizi yaptık
        let slicedDate = splitedDate.slice(0, 10); //0dan başlayıp 9. karaktere kadar göster dedik
        let joinedDate = slicedDate.join(""); //harf harf array olan diziyi string yaptık
    */
 
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">

            <Link to="#/">
                {/* loading="lazy" => resim yüklenirken minik resim çıkmasın, alt propu aktif olmasın. */}
                <Image src={item.photos[0]} width="250px" alt="product" loading="lazy" />

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        {moment(item.createdAt).format('DD/MM/YYYY')}
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                        {item.title}
                    </Box>
                    <Box>{item.price} TL</Box>
                </Box>
            </Link>

            <Button colorScheme="pink">
                Add to basket
            </Button>
        </Box>
    )
}

export default Card
