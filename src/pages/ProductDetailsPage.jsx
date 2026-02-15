import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import { getProductDetails } from '../api/api';
import { getCartFromLocalStorage } from '../helpers/cartHelpers';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import PictureCarrousel from '../components/PictureCarrousel';
import randomlyFormatParagraph from '../helpers/randomlyFormatParragraph';
import Reviews from '../components/Reviews';
import NavigationButton from '../components/navigation-button';
import { useI18n } from '../context/I18nContext';

const ProductDetailPage = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);
	const [isProductInCart, setIsProductInCart] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const maxTextLength = 350;
	const [formattedDescription, setFormattedDescription] = useState(null);
	const { t } = useI18n();

	useEffect(() => {
		if (product) {
			const formatted = randomlyFormatParagraph(product.description_large);
			setFormattedDescription(formatted);
		}
	}, [product]);

	const getFormattedParagraph = () => {
		if (!formattedDescription) return '';
		return isExpanded
			? formattedDescription
			: formattedDescription.slice(0, maxTextLength) + ' ...';
	};

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const productData = await getProductDetails(productId);
				setProduct(productData);
			} catch (error) {
				setError(t('error-detalles-producto'));
				console.log('error.message', error.message);
			}
		};

		fetchProductDetails();
	}, [productId, t]);

	useEffect(() => {
		const cart = getCartFromLocalStorage();
		const isInCart = cart.find((item) => item.id === parseInt(productId));
		setIsProductInCart(Boolean(isInCart));
	}, [productId]);

	if (error) return <Typography>{error}</Typography>;

	return (
		<PageContainer>
			<PageHeader
				title={(product && product.name) || ''}
				isLoading={!product}
				isLoadingText={t('cargando-productos')}
			>
				<NavigationButton href="/products" text={t('volver-a-productos')} justifyContent='flex-start' />
			</PageHeader>

			{product && (
				<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
					<ProductCard
						product={product}
						isProductInCart={isProductInCart}
						disableLinkToDetails
					/>
					<Box sx={{ width: '100%', maxWidth: '400px' }}>
						<div
							dangerouslySetInnerHTML={{
								__html: getFormattedParagraph(product, isExpanded),
							}}
						/>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<Button variant="text" onClick={() => setIsExpanded(!isExpanded)}>
								{isExpanded ? t('ver-menos') : t('ver-mas')}
							</Button>
						</Box>
					</Box>
					<PictureCarrousel
						pictures={[...product.images]}
					/>
				</Box>
			)}

			<Reviews productId={productId} />
		</PageContainer>
	);
};

export default ProductDetailPage;
