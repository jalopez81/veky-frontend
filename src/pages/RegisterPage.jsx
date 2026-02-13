import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister } from '../api/api';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import { useI18n } from '../context/I18nContext';

const RegisterPage = () => {
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = t('nombre-usuario-requerido');
    if (!email.trim()) {
      errors.email = t('correo-requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('correo-invalido');
    }
    if (!password) errors.password = t('contrasena-requerida');
    if (!confirmPassword) {
      errors.confirmPassword = t('confirmar-contrasena-requerida');
    } else if (password !== confirmPassword) {
      errors.confirmPassword = t('contrasenas-no-coinciden');
    }
    return errors;
  };

  const handleRegister = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    try {
      await apiRegister(username, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Ocurrió un error');
    }
  };

  return (
    <PageContainer>
      <PageHeader title={t('registro')}></PageHeader>

      <Box sx={{ margin: '0 auto', maxWidth: '400px' }}>
        <TextField
          label={t('usuario')}
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!validationErrors.username}
          helperText={validationErrors.username}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label={t('correo-electronico')}
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label={t('contrasena')}
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!validationErrors.password}
          helperText={validationErrors.password}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label={t('confirmar-contrasena')}
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!validationErrors.confirmPassword}
          helperText={validationErrors.confirmPassword}
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
            onClick={handleRegister}
            fullWidth
          >
            {t('aceptar')}
          </Button>
          <Typography variant="body1">
            <Box sx={{ marginRight: 2, display: 'inline-block' }}>
              {t('ya-tienes-cuenta')}
            </Box>
            <Link to="/login">
              <Button variant="contained" color="secondary" size="small">
                {t('iniciar-sesion')}
              </Button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default RegisterPage;
