import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { apiFetchInventory } from '../api/api';
import InventoryCard from '../components/InventoryCard';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import { useI18n } from '../context/I18nContext';

const InventoryPage = () => {
  const { t } = useI18n();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [featchDataCount, setFeatchDataCount] = useState(0);

  // Filters states
  const [stockStatus, setStockStatus] = useState({
    inStock: true,
    outOfStock: false,
    lowStock: false
  });
  const [activeStatus, setActiveStatus] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch products and stock levels
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiFetchInventory();
        setProducts(response.data);
      } catch (err) {
        setError(t('fallo-al-cargar-inventario'));
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [featchDataCount, t]);

  return (
    <PageContainer>
      <PageHeader
        title={t('inventario')}
        isLoading={loading}
        isLoadingText={t('inventario-loading')}
      >
        <NavigationButton href="/home" text={t('inicio') + ' ►'} />
      </PageHeader>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
          flexDirection: 'column',
        }}
      >
        <TextField
          id="search"
          label={t('buscar-producto')}
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
          {/* Stock Status Filters */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={stockStatus.inStock}
                  onChange={() => {
                    setFeatchDataCount(prev => prev + 1)
                    setStockStatus({
                      ...stockStatus,
                      inStock: !stockStatus.inStock,
                    })
                  }
                  }
                />
              }
              label={`${t('en-stock')} (${products.filter(p => p.stock > 0).length})`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stockStatus.outOfStock}
                  onChange={() => {
                    setFeatchDataCount(prev => prev + 1)
                    setStockStatus({
                      ...stockStatus,
                      outOfStock: !stockStatus.outOfStock,
                    })
                  }
                  }
                />
              }
              label={`${t('agotado')} (${products.filter(p => p.stock === 0).length})`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stockStatus.lowStock}
                  onChange={() => {
                    setFeatchDataCount(prev => prev + 1)
                    setStockStatus({
                      ...stockStatus,
                      lowStock: !stockStatus.lowStock,
                    })
                  }
                  }
                />
              }
              label={`${t('quedan-pocos')} (${products.filter(p => p.stock < 10).length})`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={activeStatus}
                  onChange={() => {
                    setFeatchDataCount(prev => prev + 1)
                    setActiveStatus(!activeStatus)
                  }
                  }
                />
              }
              label={`${t('activo')} (${products.filter(p => p.active).length})`}
            />
          </Box>

          {/* Price Range Filter */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              sx={{ width: 150 }}
              size='small'
              label={t('precio-minimo')}
              variant="outlined"
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Math.max(0, e.target.value), priceRange[1]])
              }
            />
            <TextField
              sx={{ width: 150 }}
              size='small'
              label={t('precio-maximo')}
              variant="outlined"
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(priceRange[0], e.target.value),
                ])
              }
            />
          </Box>
        </Box>
      </Box>
      {/* Show error or success message */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, margin: '1rem 0' }}>
        {error && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography color="error">{error}</Typography>
            <Typography color="primary" variant="subtitle">
              {t('permisos-necesarios')}
            </Typography>
          </Box>
        )}
      </Box>
      {/* products container */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
        {products.filter((product) => {
          // Filter by search term
          const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

          // Filter by stock status

          const matchesStockStatus =
            (stockStatus.inStock && product.stock > 0) ||
            (stockStatus.outOfStock && product.stock === 0) ||
            (stockStatus.lowStock && product.stock > 0 && product.stock < 10);

          // Filter by price range
          const matchesPriceRange =
            product.price >= priceRange[0] && product.price <= priceRange[1];

          // Filter by active status
          const matchesActiveStatus = product.active === activeStatus;

          // Apply all filters
          return matchesSearch && matchesStockStatus && matchesPriceRange && matchesActiveStatus;
        }).map((product) => (
          <InventoryCard key={product.id} product={product} />
        ))
        }

      </Box>
    </PageContainer>
  );
};

export default InventoryPage;
