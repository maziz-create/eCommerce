import React from 'react'
import { useParams } from 'react-router-dom' //routeden gelen id alınacak
import { postProduct } from '../../../api' //product detayını id vererek alacağımız api call func
import { useMutation, useQueryClient } from 'react-query' //yapacağımız yeni sorgu için, update.

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
import newProductScheme from './validations.js'

import { message } from 'antd'; //handleSubmit altında, güncelleme butotuna basıldığı zaman ekranda mesaj göstereceğiz.

function NewProduct() {
    const queryClient = useQueryClient();

    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries('admin:products')
    });

    //bag => girilmiş değerler, bag => form üzerinde bir işlem yapmak istersen, mesela resetleme, validasyonları tekrar çalıştırmak vs..
    const handleSubmit = async (values, bag) => { //type'ı submit olan bir butona basılınca form bilgileri buraya uğruyor. form actionu yapıyoruz da diyebiliriz.
        // console.log(values);
        message.loading({
            content: 'Loading...',
            key: 'product-add',
        });

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos), //hata veriyordu...
        }

        newProductMutation.mutate(newValues, {
            onSuccess: () => {
                message.success({
                    content: 'The product successfully added!',
                    key: 'product-add',
                    duration: 2,
                })
                // console.log("silme işlemi başarılı!")
            }
        })
    }

    // console.log(product_id);

    return (
        <div>
            <Text fontSize="2xl">New Product</Text>

            <Formik initialValues={{
                title: "",
                description: "",
                price: "",
                photos: [],
            }}
                validationSchema={newProductScheme}
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
                                        >
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </>
                }
            </Formik>
        </div >
    )
}

export default NewProduct
