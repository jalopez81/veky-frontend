import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { apiCreateProduct, uploadProductImages } from '../api/api';
import { useI18n } from '../context/I18nContext';

const validateProductData = (productData) => {
    const {
        name,
        sku,
        category,
        description,
        description_large,
        price,
        stock,
        average_rating,
    } = productData;

    if (
        !name.trim() ||
        !sku.trim() ||
        !category.trim() ||
        !description.trim() ||
        !description_large.trim() ||
        !price ||
        !stock ||
        !average_rating
    ) {
        return false;
    }

    if (
        isNaN(price) ||
        price <= 0 ||
        isNaN(stock) ||
        stock <= 0 ||
        isNaN(average_rating) ||
        average_rating < 0 ||
        average_rating > 5
    ) {
        return false;
    }

    return true;
};

const AddProductPage = () => {
    const { t } = useI18n();
    const [editing, setEditing] = useState(true);
    const [productData, setProductData] = useState({
        name: 'DUMMY PRODUCT 1',
        sku: 'DMMP1',
        category: 'aceites',
        description: 'Aceite especial para el pelo',
        description_large: `Este aceite está especialmente diseñado para restaurar la hidratación del cabello seco...`,
        price: '23.40',
        stock: '20',
        average_rating: '3.5'
    });

    const [imageFiles, setImageFiles] = useState({});
    const [previewImagesUrl, setPreviewImagesUrl] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const previewUrl = URL.createObjectURL(file);

            setImageFiles((prev) => ({ ...prev, [name]: file }));
            setPreviewImagesUrl((prev) => ({ ...prev, [name]: previewUrl }));
        }
    };

    const resetProductData = () => {
        setProductData({
            name: '',
            sku: '',
            category: '',
            description: '',
            description_large: '',
            price: '',
            stock: '',
            average_rating: '',
        });
        setImageFiles({});
        setPreviewImagesUrl({});
        setEditing(true);
        setSuccess(null);
        setError(null);
    };

    const handleCreateProduct = async (productData) => {
        try {
            const images = Object.values(imageFiles);
            await uploadProductImages(images, productData.sku);

            const data = {
                ...productData,
                average_rating: parseFloat(productData.average_rating),
                price: parseFloat(productData.price),
                stock: parseInt(productData.stock, 10),
            };

            const response = await apiCreateProduct(data);
            if (response.status === 201) {
                setEditing(false);
                setSuccess(t('producto-creado-exitosamente'));
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating product');
        }
    };

    useEffect(() => {
        setIsFormValid(validateProductData(productData));
    }, [productData]);

    return (
        <PageContainer>
            <PageHeader title={t('agregar-producto')} />
            <Box component="form" noValidate sx={{ mt: 2 }}>
                <TextField label={t('nombre-del-producto')} fullWidth name="name" value={productData.name} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label={t('sku')} fullWidth name="sku" value={productData.sku} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label={t('categoria')} fullWidth name="category" value={productData.category} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label={t('descripcion-corta')} fullWidth name="description" value={productData.description} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField label={t('descripcion-larga')} fullWidth name="description_large" value={productData.description_large} onChange={handleChange} multiline rows={4} sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField label={t('precio')} name="price" type="number" value={productData.price} onChange={handleChange} fullWidth />
                    <TextField label={t('stock')} name="stock" type="number" value={productData.stock} onChange={handleChange} fullWidth />
                    <TextField label={t('rating-promedio')} name="average_rating" type="number" inputProps={{ step: 0.1 }} value={productData.average_rating} onChange={handleChange} fullWidth />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    <ImageUrlPicker imageName="imageurl1" handleFileChange={handleFileChange} previewImagesUrl={previewImagesUrl} />
                    <ImageUrlPicker imageName="imageurl2" handleFileChange={handleFileChange} previewImagesUrl={previewImagesUrl} />
                    <ImageUrlPicker imageName="imageurl3" handleFileChange={handleFileChange} previewImagesUrl={previewImagesUrl} />
                </Box>

                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                {success && <Typography color="success.main" sx={{ mb: 2 }}>{success}</Typography>}

                <Box sx={{ display: editing ? 'flex' : 'none', gap: 2 }}>
                    <Button variant="contained" onClick={() => handleCreateProduct(productData)} disabled={!isFormValid}>
                        {t('guardar')}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>
                        {t('cancelar')}
                    </Button>
                </Box>

                <Box sx={{ display: editing ? 'none' : 'flex' }}>
                    <Button variant="contained" onClick={resetProductData}>
                        {t('nuevo-producto')}
                    </Button>
                </Box>
            </Box>
        </PageContainer>
    );
};

function ImageUrlPicker({ imageName, handleFileChange, previewImagesUrl }) {
    const { t } = useI18n();
    const fileInputRef = useRef(null);

    return (
        <Box sx={{
            border: 'solid 1px #ccc',
            width: 150,
            height: 150,
            backgroundColor: '#e7dfc9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px'
        }}>
            <input
                type="file"
                name={imageName}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
            />

            <Button variant="contained" onClick={() => fileInputRef.current.click()}>
                {t('subir-imagen')}
            </Button>

            {previewImagesUrl[imageName] && (
                <Paper elevation={3} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                    <img src={previewImagesUrl[imageName]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
					<Button variant="contained" onClick={() => fileInputRef.current.click()}>
                        {t('cambiar-imagen')}
                    </Button>
                </Paper>
            )}			
        </Box>
    );
}

ImageUrlPicker.propTypes = {
    imageName: PropTypes.string.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    previewImagesUrl: PropTypes.object.isRequired,
};

export default AddProductPage;