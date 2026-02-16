import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchWishlist } from '../helpers/productHelpers';
import DisplayRandomProducts from '../components/DisplayRandomProducts';
import { useI18n } from '../context/I18nContext';

const WishlistPage = () => {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // fetch wishlist
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const wishList = await fetchWishlist();
        const ps = await fetchProducts();
        const arrProducts = ps.products;

        const wishProducts = wishList.map((wish) => {
          const product = arrProducts.find(
            (product) => product.id === wish.product_id
          );
          if (product) product.isInWishlist = true;
          return product;
        })
          .filter(p => p !== undefined)

        setProducts(wishProducts);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasFavoriteProducts = products.length > 0;

  return (
    <PageContainer>
      <PageHeader
        title={t('lista-de-favoritos')}
        subtitle={t('los-productos-que-siempre')}
        isLoading={isLoading}
        isLoadingText={t('cargando-productos')}
      >
        <NavigationButton href="/cart" text={t('carrito')} />
      </PageHeader>

      <Box
        id="product-cards-container"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={`${product.id}${product.name}`}>
            <ProductCard product={product} isProductInCart={false} />
          </Grid>
        ))}
      </Box>
      {hasFavoriteProducts && <NavigationButton href="/products" text={t('ver-productos')} justifyContent='center' />}
      {!hasFavoriteProducts && !isLoading && (
        <Box sx={{ margin: '2rem', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {t('no-tienes-favoritos')}
          </Typography>
          <Typography variant="body1">
            {t('visita-catalogo-favoritos')}
          </Typography>
          <NavigationButton href="/products" text={t('ver-todos-los-productos')} justifyContent='center' />
          <DisplayRandomProducts />
        </Box>
      )}
    </PageContainer>
  );
};

export default WishlistPage;
