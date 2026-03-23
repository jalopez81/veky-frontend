import { Box, Container, Typography, Link as MuiLink, Grid } from '@mui/material';
import { useI18n } from '../../context/I18nContext';
import { Link as RouterLink } from 'react-router-dom'; 

const Footer = () => {
  const { t } = useI18n();

  const navLinkStyles = {
    color: 'inherit', underline: 'none', display: 'block',
    mb: 1,
    fontSize: '0.9rem',
    opacity: 0.8,
    transition: '0.3s', '&:hover': { 
      opacity: 1,
      color: '#90caf9', textDecoration: 'underline' }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '40px 0 20px', mt: 'auto', width: '100%',
        "@media print": {
          display: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información de la Empresa */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              VekyRD
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              {t('footer-tagline')}
            </Typography>
          </Grid>

          {/* Enlaces Útiles */}
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('enlaces-utiles')}
            </Typography>
            <MuiLink component={RouterLink} to="/products" sx={navLinkStyles}>
              {t('productos')}
            </MuiLink>
            <MuiLink component={RouterLink} to="/cart" sx={navLinkStyles}>
              {t('carrito')}
            </MuiLink>
            <MuiLink component={RouterLink} to="/contactus" sx={navLinkStyles}>
              {t('contacto')}
            </MuiLink>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('siguenos')}
            </Typography>
            <MuiLink
              href="https://www.facebook.com/profile.php?id=100064147778470"
              target="_blank"
              rel="noopener noreferrer" sx={navLinkStyles}
            >
              Facebook
            </MuiLink>
            <MuiLink
              href="https://www.instagram.com/vekyrd/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              sx={navLinkStyles}
            >
              Instagram
            </MuiLink>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          marginTop: 4, 
          paddingTop: 2 
        }}>
          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} VekyRD. {t('todos-los-derechos-reservados')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;