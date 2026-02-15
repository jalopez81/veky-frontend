import { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { apiCreateOrder, apiGetCreditCard, apiPayment } from '../api/api';
import PageContainer from '../components/PageContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import OrderDetails from '../components/OrderDetails';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { validatePaymentCardForm } from '../helpers/validatePaymentCardForm';
import { getCartFromLocalStorage } from '../helpers/cartHelpers';
import { getFromDate } from '../utils/getFromDate';
import NavigationButton from '../components/navigation-button';
import { useI18n } from '../context/I18nContext';

const OrderPage = () => {
  const { t } = useI18n();
  const [orderHash, setOrderHash] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationHash, setConfirmationHash] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    focus: false,
  });

  const [shippingDetails, setShippingDetails] = useState({
    address1: 'C/Duarte #45',
    address2: 'C/Duarte #45, Miraflores',
    sector: 'Miraflores',
    city: 'Santo Domingo Este',
    country: 'República dominicana',
    zipcode: '99809',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, resetPurchase } = useAppContext();

  const navigate = useNavigate();

  const getCreditCard = async () => {
    setIsLoading(true);
    const creditCardData = await apiGetCreditCard();

    if (creditCardData) {
      const { cardholder_name, card_number, expiration_date, cvv } = creditCardData;
      const monthNumber = getFromDate(expiration_date).m;
      const yearNumber = getFromDate(expiration_date).y.slice(-2);
      const expirationDate = `${monthNumber}/${yearNumber}`;

      setCardDetails({
        name: cardholder_name || '',
        number: card_number || '',
        expiry: expirationDate,
        cvc: cvv || '',
        focus: false,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const items = orderDetails && orderDetails.items;
    const isEmptyCart = items && items.length === 0;
    if (isEmptyCart && !confirmationHash) navigate('/products');
  }, [confirmationHash, navigate, orderDetails]);

  useEffect(() => {
    const item = localStorage.getItem('orderDetails');
    const orderDetails = item ? JSON.parse(item) : {};
    setOrderDetails(orderDetails);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const createOrder = async (orderDetails) => {
      try {
        // get cart
        const cart = getCartFromLocalStorage();
        const order = await apiCreateOrder(cart, orderDetails);
        setOrderHash(order.order_hash);
      } catch (err) {
        if (err.response.status === 403) {
          navigate('/login');
        }
        console.error(err);
      }
    };

    const orderDetailsLength = Object.values(orderDetails).length;

    orderDetailsLength > 0 && createOrder(orderDetails);
  }, [isAuthenticated, navigate, orderDetails]);

  useEffect(() => {
    getCreditCard()
  }, []);

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    if (!validatePaymentCardForm(cardDetails, (msg) => {
      setErrorMessage(t(msg) || msg);
    })) return;

    const cart = getCartFromLocalStorage();

    try {
      const paymentData = await apiPayment({
        orderHash,
        ...orderDetails,
        cart: cart,
        paymentDetails: cardDetails,
        shippingDetails,
      });

      if (paymentData.status === 'success') {
        setConfirmationHash(paymentData.confirmationHash);
        resetPurchase();
        setSuccessMessage(t('pago-completado-exito') || 'Pago realizado con éxito.');
      } else {
        setErrorMessage(t('pago-rechazado') || 'El pago fue rechazado. Intente nuevamente.');
      }
    } catch (err) {
      setErrorMessage(t('error-procesar-pago') || 'Hubo un error al procesar el pago. Intente nuevamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardDetails((prev) => ({ ...prev, focus: evt.target.name }));
  };

  if (successMessage)
    return (
      <PageContainer>
        <PageHeader
          title=""
          isLoading={isLoading}
          isLoadingText={t('cargando')}
        >
          <NavigationButton href="/products" text={`${t('productos')} ►`} justifyContent="flex-end" />
        </PageHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('pago-exitoso')}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {t('gracias-por-su-compra')}
          </Typography>
          <Typography variant="body1">
            {t('codigo-confirmacion-es')} <b>{confirmationHash}</b>
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
              {t('ver-otros-productos')}
            </Button>
          </Box>
        </Box>
      </PageContainer>
    );

  if (!isAuthenticated) return null;

  return (
    <PageContainer>
      <PageHeader
        title={t('pago')}
        isLoading={isLoading}
        isLoadingText={t('cargando')}
      >
        <Typography variant="body1" gutterBottom sx={{ textAlign: 'right' }}>
          {t('pedido-num')} {orderHash}
        </Typography>
        <NavigationButton href="/cart" text={`◄ ${t('carrito')}`} justifyContent="flex-start" />
      </PageHeader>
      <Box
        id="payment-forms-container"
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          padding: 2,
          maxWidth: '1200px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flex: 1,
            maxWidth: '400px',
          }}
        >
          <Cards
            number={cardDetails.number}
            expiry={cardDetails.expiry}
            cvc={cardDetails.cvc}
            name={cardDetails.name}
            focused={cardDetails.focus}
          />
          <TextField
            type="name"
            name="name"
            placeholder={t('nombre-y-apellido')}
            value={cardDetails.name}
            sx={{ background: 'white' }}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            type="number"
            name="number"
            placeholder={t('numero-tarjeta')}
            value={cardDetails.number}
            sx={{ background: 'white' }}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            type="expiry"
            name="expiry"
            placeholder={t('fecha-expiracion')}
            value={cardDetails.expiry}
            sx={{ background: 'white' }}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <TextField
            type="cvc"
            name="cvc"
            placeholder="cvc"
            value={cardDetails.cvc}
            sx={{ background: 'white' }}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Box>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flex: 1,
            maxWidth: '400px',
          }}
          noValidate
        >
          <Typography variant="h6">{t('detalles-envio')}</Typography>
          <TextField
            label={t('calle-y-numero')}
            name="address1"
            value={shippingDetails.address1}
            onChange={handleShippingInputChange}
            sx={{ background: 'white' }}
            fullWidth
          />
          <TextField
            label={t('sector')}
            name="address2"
            value={shippingDetails.address2}
            onChange={handleShippingInputChange}
            sx={{ background: 'white' }}
            fullWidth
          />
          <TextField
            label={t('ciudad')}
            name="city"
            value={shippingDetails.city}
            onChange={handleShippingInputChange}
            sx={{ background: 'white' }}
            fullWidth
          />
          <TextField
            label={t('pais')}
            name="country"
            value={shippingDetails.country}
            onChange={handleShippingInputChange}
            sx={{ background: 'white' }}
            fullWidth
          />
          <OrderDetails />
          <Button variant="contained" color="primary" onClick={handlePayment}>
            {isLoading ? (
              <>
                <CircularProgress color="#ffffff" size={20} />
                &nbsp;
                <span>{t('procesando')}</span>
              </>
            ) : (
              t('pagar-ahora')
            )}
          </Button>
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default OrderPage;
