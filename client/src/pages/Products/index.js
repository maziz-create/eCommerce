import React from 'react'
import Card from '../../components/Card'
import { Grid, Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchProductList } from '../../api'

function Products() {
    //alttaki products bir key. Gelen datalar cashleniyor ve keyi bu oluyor.
    const { isLoading, error, data } = useQuery('products', fetchProductList
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    // console.log("data", data);

    return (
        <div>
            <Grid templateColumns="repeat(4, 1fr)" gap="2">
                {
                    data.map((item, index) => {
                        return <Card key={index} item={item} />
                    })
                }
            </Grid>
        </div>
    )
}

export default Products