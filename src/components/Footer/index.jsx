import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { useI18n } from '../../context/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '20px 0',
        mt: 4,
        width: '100%',
        "@media print": {
          display: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Information */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              VekyRD
            </Typography>
            <Typography variant="body2">
              {t('footer-tagline')}
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('enlaces-utiles')}
            </Typography>
            <Box>
              <Link href="/products" color="inherit" underline="hover">
                {t('productos')}
              </Link>
            </Box>
            <Box>
              <Link href="/cart" color="inherit" underline="hover">
                {t('carrito')}
              </Link>
            </Box>
            <Box>
              <Link href="/contactus" color="inherit" underline="hover">
                {t('contacto')}
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('siguenos')}
            </Typography>
            <Box>
              <Link
                href="https://www.facebook.com/profile.php?id=100064147778470"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="hover"
              >
                Facebook
              </Link>
            </Box>
            <Box>
              <Link
                href="https://www.instagram.com/vekyrd/?hl=es"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="hover"
              >
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          © {new Date().getFullYear()} VekyRD. {t('todos-los-derechos-reservados')}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
