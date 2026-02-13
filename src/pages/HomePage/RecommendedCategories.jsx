import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useI18n } from '../../context/I18nContext';

const RecommendedCategories = () => {
  const { t } = useI18n();
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
        {t('categorias-destacadas')}
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            titleKey: 'shampoos',
            image: '/home_page_product1.jpg',
            link: '/products?category=shampoo',
          },
          {
            titleKey: 'acondicionadores',
            image: '/home_page_product2.jpg',
            link: '/products?category=acondicionador',
          },
          {
            titleKey: 'sprays',
            image: '/home_page_product3.jpg',
            link: '/products?category=spray',
          },
        ].map((category, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={category.image}
                alt={t(category.titleKey)}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {t(category.titleKey)}
                </Typography>
                <Button
                  variant="outlined"
                  href={category.link}
                  sx={{ marginTop: 2 }}
                >
                  {t('ver-mas')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedCategories;
