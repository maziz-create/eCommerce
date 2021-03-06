import React from 'react'

import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react'

import { useFormik } from 'formik'
import validationSchema from './validations'

import { fetchRegister } from '../../../api'

// auth context
import { useAuth } from '../../../contexts/AuthContext'

function Signup({ history }) {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema, //yup ile ürettiğimiz validation
        // values: formdaki datalar ,, bag: form üzerinde yapılabilen birtakım işlemler(form reset gibi)
        onSubmit: async (values, bag) => {
            // fetchRegister(values);
            // bag.resetForm();
            try {
                const registerResponse = await fetchRegister({
                    //backend'e passwordConfirm alanını göndermek istemiyoruz...
                    email: values.email,
                    password: values.password,
                })

                login(registerResponse) //içindeki user'ı AuthContextteki user state'ine yazdırdık.
                history.push("/profile") //kayıt olan kişiyi profil ekranına atıyor.
                console.log("kayıt olan kişi =>", registerResponse);
            } catch (e) {
                bag.setErrors({ general: e.response.data.message })
            }
        },
    })
    return (
        <div>
            <Flex align="center" width="full" justifyContent="center">
                <Box pt={10}>
                    <Box textAlign="center">
                        <Heading>Sign Up</Heading>
                    </Box>
                    <Box my={5}>
                        {
                            formik.errors.general && (
                                <Alert status="error">{formik.errors.general}</Alert>
                            )
                        }
                    </Box>
                    <Box my={5} textAlign="left">
                        {/* altta başta formik.onSubmit kullandık, e.preventDefault için handleSubmite çevirdik. */}
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    name="email"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                />
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                />
                            </FormControl>

                            <FormControl mt="4">
                                <FormLabel>Password Confirm</FormLabel>
                                <Input
                                    name="passwordConfirm"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordConfirm}
                                    isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                                />
                            </FormControl>

                            <Button mt="4" width="full" type="submit">
                                Signup
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default Signup
