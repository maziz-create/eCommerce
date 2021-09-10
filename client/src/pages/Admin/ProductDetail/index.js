import React from 'react'
import { useParams } from 'react-router-dom' //routeden gelen id alınacak
import { fetchProductDetail, updateProduct } from '../../../api' //product detayını id vererek alacağımız api call func
import { useQuery } from 'react-query' //yapacağımız yeni sorgu için, update.

import {
    Text,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
} from '@chakra-ui/react'
import { Formik, FieldArray } from 'formik'
import validationSchema from './validations'

import { message } from 'antd'; //handleSubmit altında, güncelleme butotuna basıldığı zaman ekranda mesaj göstereceğiz.

function ProductDetail() {
    const { product_id } = useParams();

    // Oluşturulacak cache keylerini diziye koyarak ürün ürün ayırıyoruz. yoksa önceki cacheye yeni cache yazılır. 
    const { isLoading, isError, data, error } = useQuery(['admin:product', product_id],
        () => fetchProductDetail(product_id),
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    //bag => girilmiş değerler, bag => form üzerinde bir işlem yapmak istersen, mesela resetleme, validasyonları tekrar çalıştırmak vs..
    const handleSubmit = async (values, bag) => { //type'ı submit olan bir butona basılınca form bilgileri buraya uğruyor. form actionu yapıyoruz da diyebiliriz.
        console.log("submitted");
        message.loading({
            content: 'Loading...',
            key: 'product-update',
        });

        try {
            await updateProduct(values, product_id);

            message.success({
                content: 'The product successfully updated!',
                key: 'product-update',
                duration: 2
            })
        } catch (error) {
            message.error('The product does not updated!')
        }
    }

    console.log(product_id);
    console.log(data);

    return (
        <div>
            <Text fontSize="2xl">Edit</Text>

            <Formik initialValues={{
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.photos
            }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    // buraya Formiğin vermiş olduğu şeyleri yazıyoruz.
                    ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) =>
                        <>
                            <Box>
                                <Box my="5" textAlign="left">
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                name="title"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && errors.title}
                                            />
                                            {
                                                touched.title && errors.title && (
                                                    <Text color="green.500">{errors.title}</Text>
                                                )
                                            }
                                        </FormControl>

                                        <FormControl mt="5">
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                disabled={isSubmitting}
                                                isInvalid={touched.description && errors.description}
                                            />
                                        </FormControl>

                                        <FormControl mt="5">
                                            <FormLabel>Price (TL)</FormLabel>
                                            <Input
                                                name="price"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                disabled={isSubmitting}
                                                isInvalid={touched.price && errors.price}
                                            />
                                        </FormControl>

                                        <FormControl mt="5">
                                            <FormLabel>Photos</FormLabel>
                                            <FieldArray
                                                name="photos"
                                                render={(arrayHelpers) => (
                                                    <div mt="2">
                                                        {
                                                            values.photos && values.photos.map((photo, index) => (
                                                                <div key={index}>
                                                                    <Input
                                                                        name={`photos.${index}`}
                                                                        value={photo}
                                                                        disabled={isSubmitting}
                                                                        onChange={handleChange}
                                                                        width="3xl"
                                                                    />

                                                                    <Button
                                                                        ml="4"
                                                                        type="button"
                                                                        colorScheme="red"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        }

                                                        < Button mt="5" onClick={() => arrayHelpers.push('')}>
                                                            Add a photo
                                                        </Button>
                                                    </div>
                                                )}
                                            />
                                        </FormControl>

                                        <Button
                                            mt={4}
                                            width="full"
                                            type="submit"
                                            isLoading={isSubmitting}
                                        >Update</Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                }
            </Formik>
        </div >
    )
}

export default ProductDetail
