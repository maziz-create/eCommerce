import React from 'react'
import Card from '../../components/Card'
import { Grid, Box, Flex, Button } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'
import { fetchProductList } from '../../api'

function Products() {
    //alttaki 'products' bir key. Gelen datalar cashleniyor ve keyi bu oluyor.
    /*
        useQuery yerine useInfiniteQuery kullandık çünkü backendimizde gelen ürünler 12 limiti ile geldi.
        Bir sayfada 12 ürün göstertmek istediğimiz için bu sınır kondu.
    */
    const { data,
        error,
        fetchNextPage, //diğer sayfayı fetch edecek fonksiyon
        hasNextPage,
        isFetchingNextPage, //diğer sayfa var mı yok mu an'ı.
        status, } = useInfiniteQuery('products', fetchProductList, {
            getNextPageParam: (lastGroup, allGroups) => {
                const morePagesExist = lastGroup?.length === 12;

                if (!morePagesExist) {
                    return;
                }

                return allGroups.length + 1;
            }
        }
        )

    // eskiden isLoadng ve error propları vardı..
    if (status === "loading") return 'Loading...'

    if (status === "error") return 'An error has occurred: ' + error.message

    console.log("data", data);

    return (
        <div>
            <Grid templateColumns="repeat(4, 1fr)" gap="2">
                {
                    // data.map((item, index) => {
                    //     return <Card key={index} item={item} />
                    //  ARTIK PAGE PAGE GELİYOR O YÜZDEN İÇ İÇE 2 MAP LAZIM})

                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {
                                group.map((item) => (
                                    <Box w="100%" key={item._id}>
                                        <Card item={item} />
                                    </Box>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>
            <Flex mt="10" justifyContent="center">
                <Button colorScheme="blue"
                    onClick={() => fetchNextPage()}
                    isLoading={isFetchingNextPage}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>
            </Flex>
        </div>
    )
}

export default Products
