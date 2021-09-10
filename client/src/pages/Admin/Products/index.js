import { useMemo } from 'react' //her f5'te columns verileri baştan render edilmesin diye hafızaya yazacağız.
import { useQuery, useMutation, useQueryClient } from 'react-query' //useMutation => api.js altındaki deleteProduct'a destek oluyor.
import { Link } from 'react-router-dom'
import { fetchProductList, deleteProduct } from '../../../api'

// import moment from "moment"; //date düzeni için yapacaktık..

import { Text } from '@chakra-ui/react'
import { Table, Popconfirm } from 'antd'

function Products() {
    //silinen ürün için refetch yapamıyoruz... o yüzden index.js'deki queryClient'e erişimi sağlayacak şeyi getirdi.
    const queryClient = useQueryClient();

    const { isLoading, isError, data, error } = useQuery('admin:products', fetchProductList);

    const deleteMutation = useMutation(deleteProduct, {
        //silme işleminden önce veya sonra yapmak istediğin bir şey var mı? refetch falan mesela..
        onSuccess: () => queryClient.invalidateQueries('admin:products')
        //kökteki index.js'de yer alan queryClient'a eriştik.
        /* deleteProduct isimli fetch çalıştığında admin:products kod adlı
        fetch işlemini baştan yap. bu kod adı yukaruda ve fetchProductList fetch'ini çalıştırıyor.
        Amaç => useMemo ile sadece didMount anında columns'ı üret dedik fakat şu an ürün siliyoruz ve yeniden
        fetch edilmesi gerekiyor ürünün kaldırılması için.
        */

    });

    //antdesign tablo yapısına uygun tanımları gerçekleştiriyoruz.
    //useMemo => didMount anında bir kere üretilsin columns alanı. sürekli o kullanılsın. her f5te yenilemesin.
    const columns = useMemo(() => {
        return [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt'
            },
            {
                title: 'Action', //butonlarımız için. tabloda sil editle butonları falan olacak.
                key: 'action',
                render: (text, record) => ( //record'u o bize veriyor.
                    <>
                        <Link to={`/admin/products/${record._id}`}>Edit</Link>
                        <Popconfirm
                            title="Are you sure?"
                            onConfirm={() => {
                                alert('silindi!');
                                deleteMutation.mutate(record._id, {
                                    onSuccess: () => {
                                        console.log("silme işlemi başarılı!");
                                    }
                                })
                            }}
                            onCancel={() => {
                                console.log('iptal edildi!');
                            }}
                            onText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <a style={{ marginLeft: 10 }} href="/#">Delete</a>
                        </Popconfirm>
                    </>
                )
            }
        ]
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }

    console.log(data);

    return (
        <div>
            <Text fontSize="2xl" p="5">Products</Text>

            {/* rowKey => klasik key mevzusu. item._id neredeyse onu getirip koyuyor. */}
            <Table dataSource={data} columns={columns} rowKey="_id" />
        </div>
    )
}

export default Products
