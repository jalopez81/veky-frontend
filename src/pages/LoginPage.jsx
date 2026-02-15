import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import NavigationButton from '../components/navigation-button';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { useI18n } from '../context/I18nContext';

const LoginPage = () => {
  const [username, setUsername] = useState('jorge0481rd');
  const [password, setPassword] = useState('moreno81');
  const [error, setError] = useState(null);

  const { isAuthenticated, login } = useAppContext();
  const { t } = useI18n();

  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || '/products';

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      setError(null);

      navigate(returnUrl);
    } catch (error) {
      setError(t('error-autenticacion'));
      console.log(error);
    }
  };

  if (isAuthenticated)
    return (
      <PageContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '400px',
            alignItems: 'center',
            margin: '0 auto',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
            {t('hola-usuario', { username })}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {t('bienvenido-a-nuestra-tienda')}
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/products"
              fullWidth
            >
              {t('ir-a-productos')}
            </Button>
          </Box>
        </Box>
      </PageContainer>
    );

  return (
    <PageContainer>
      <PageHeader title={t('iniciar-sesion')}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <NavigationButton href="/products" text={t('productos-link') + ' ►'} />
        </Box>
      </PageHeader>
      <Box sx={{ margin: '0 auto', maxWidth: '400px' }}>
        <TextField
          label={t('usuario')}
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin(username, password);
            }
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label={t('contrasena')}
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin(username, password)}
            fullWidth
          >
            {t('aceptar')}
          </Button>
          <Box>
            <Typography sx={{ marginRight: 2, display: 'inline-block' }}>
              {t('no-tienes-cuenta')}
            </Typography>
            <Link to="/register">
              <Button variant="contained" color="secondary" size="small">
                {t('registro')}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

LoginPage.propTypes = {
  returnUrl: PropTypes.string,
};

export default LoginPage;
