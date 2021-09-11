import * as yup from 'yup';

const newProductScheme = yup.object().shape({
    title: yup.string().required("Title is a required field."), // HATA MESAJINI FARKLI Bİ TEXTTE GÖSTERİRKEN BURAYA İHTİYACIN VAR!
    description: yup.string().min(5).required(),
    price: yup.string().required(),
});

export default newProductScheme;