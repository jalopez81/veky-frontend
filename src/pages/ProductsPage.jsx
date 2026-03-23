import { Box, Chip, TextField } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import NavigationButton from '../components/navigation-button';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { apiFetchProducts, apiFetchWishlist } from '../api/api';
import {
    getCartFromLocalStorage,
    getProductsInCart,
} from '../helpers/cartHelpers';
import { useLocation } from 'react-router-dom';
import { getRandomColorFromString } from '../utils/colors';
import { Trans } from 'react-i18next';
import { useI18n } from '../context/I18nContext';

const ProductPage = () => {
    const [idsInCart, setIdsInCart] = useState([]);
    const [arrProducts, setArrProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { t } = useI18n();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const products = await apiFetchProducts();
                
                const wishlistData = await apiFetchWishlist().catch(() => []);
                const wishIds = wishlistData.map(w => w.product_id);
                
                const productsWithWishlist = products.map(p => ({
                    ...p,
                    isInWishlist: wishIds.includes(p.id)
                }));

                localStorage.setItem('wishlist', JSON.stringify(wishIds));

                setArrProducts(productsWithWishlist);

                const cart = getCartFromLocalStorage();
                const productsInCart = getProductsInCart(products, cart);
                setIdsInCart(productsInCart.map(p => p.id));

                const searchParams = new URLSearchParams(location.search);
                const categoryParam = searchParams.get('category');
                if (categoryParam) setSelectedCategory(categoryParam);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    const filteredProducts = useMemo(() => {
        return arrProducts.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
            const isActive = product.active === true;
            return matchesSearch && matchesCategory && isActive;
        });
    }, [search, selectedCategory, arrProducts]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const uniqueCategories = useMemo(() => {
        const cats = arrProducts?.map((product) => product.category) || [];
        return [...new Set(cats)];
    }, [arrProducts]);

    return (
        <PageContainer>
            <PageHeader
                title={t('nuestros-productos')}
                subtitle={t('es-tiempo-de-un-cabello-hermoso')}
                isLoading={isLoading}
                isLoadingText={t('cargando-productos')}
            >
                <NavigationButton href="/cart" text={t('carrito') + ' ►'} />
            </PageHeader>

            {!isLoading && (
                <>
                    {/* Buscador */}
                    <Box sx={{ margin: '1rem auto 2rem', width: { xs: '350px', md: '400px' }, maxWidth: '100%', background: 'white' }}>
                        <TextField
                            id="search"
                            label={t('buscar-producto')}
                            variant="outlined"
                            fullWidth
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Box>

                    {/* Chips de Categorías */}
                    <Box sx={{ display: 'flex', gap: 2, margin: '1rem 0 2rem', borderBottom: 'dashed 1px #ccc', padding: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Chip
                            sx={{ background: !selectedCategory ? '#333' : 'white', color: !selectedCategory ? 'white' : 'black', outline: 'solid 1px #ccc' }}
                            label={<Trans i18nKey="todos" />}
                            onClick={() => setSelectedCategory(null)}
                        />
                        {uniqueCategories.map((category) => (
                            <Chip
                                sx={{ 
                                    background: selectedCategory === category ? '#333' : getRandomColorFromString(category),
                                    color: selectedCategory === category ? 'white' : 'black'
                                }}
                                key={category}
                                label={category}
                                onClick={() => setSelectedCategory(category)}
                            />
                        ))}
                    </Box>

                    {/* Contenedor de Productos */}
                    <Box id="product-cards-container" sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, minHeight: '500px', justifyContent: 'center' }}>
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isProductInCart={idsInCart.includes(product.id)}
                            />
                        ))}
                    </Box>
                </>
            )}
        </PageContainer>
    );
};

export default ProductPage;