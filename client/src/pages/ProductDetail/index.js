import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProductDetail } from '../../api'
import { Box, Text, Button } from '@chakra-ui/react'
import moment from 'moment'
import ImageGallery from 'react-image-gallery';

function ProductDetail() {
    const { product_id } = useParams();
    const { isLoading, error, data } = useQuery(['product', product_id], () => fetchProductDetail(product_id)
    )
    if (isLoading) return <div>Loading...</div>

    if (error) return <div>An error has occured {error.message}</div>


    const images = data.photos.map((url) => ({ original: url }))

    return (
        <div style={{ textAlign: "center" }}>
            <Button style={{ marginBottom: 15 }} colorScheme="pink">Add to basket</Button>
            <Text style={{ marginBottom: 15 }} as="h2" fontSize="2xl">
                {data.title}
            </Text>
            <Text style={{ marginBottom: 15 }}>
                {moment(data.createdAd).format("DD/MM/YYYY")}
            </Text>
            <p>
                {data.description}
            </p>
            <Box margin="10">
                <ImageGallery
                    items={images}
                    showPlayButton={false}
                    originalWidth={"50px"}
                    showIndex={true}
                />
            </Box>
        </div>
    )
}

export default ProductDetail
