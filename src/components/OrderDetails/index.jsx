import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatPrice';
import { useI18n } from '../../context/I18nContext';

const OrderDetails = () => {
  const { orderDetails } = useAppContext();
  const { t } = useI18n();

  const getFormattedValues = (orderDetails) => {
    const subtotal = formatPrice(orderDetails.subtotal);
    const taxes = formatPrice(orderDetails.taxes);
    const shipping = formatPrice(orderDetails.shipping);
    const total = formatPrice(orderDetails.total);
    return { subtotal, taxes, shipping, total };
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Typography sx={{ width: '100px' }}>{t('subtotal')}</Typography>
        <Typography sx={{ width: '100px', textAlign: 'right' }}>
          {getFormattedValues(orderDetails).subtotal}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Typography sx={{ width: '100px' }}>{t('impuestos')}</Typography>
        <Typography sx={{ width: '100px', textAlign: 'right' }}>
          {getFormattedValues(orderDetails).taxes}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Typography sx={{ width: '100px' }}>{t('envio')}</Typography>
        <Typography sx={{ width: '100px', textAlign: 'right' }}>
          {getFormattedValues(orderDetails).shipping}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: 2,
          paddingTop: 2,
          borderTop: '1px solid black',
          fontWeight: 'bold',
        }}
      >
        <Typography sx={{ width: '100px' }}>{t('total')}</Typography>
        <Typography sx={{ width: '100px', textAlign: 'right' }}>
          {getFormattedValues(orderDetails).total}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderDetails;
