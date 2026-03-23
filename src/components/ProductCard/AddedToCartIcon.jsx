import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useI18n } from '../../context/I18nContext';
import { useEffect, useState } from 'react';

const containerStyle = {
  position: 'relative',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};


const cartStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  fontSize: '30px',
};

const textStyle = {
  fontSize: '10px',
  transform: 'translate(-8px, 15px)',
};

const AddedToCartIcon = ({ visible = false }) => {
  const [show, setShow] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const checkStyle = {
    position: 'absolute',
    top: show ? -3 : 10,
    left: show ? -7 : -5,
    opacity: show ? 1 : 0,
    color: 'green',
    transform: 'translate(5px, -28px)',
    transition: 'all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    transitionDelay: show ? '0.3s' : '0s',
  };

  return (
    <Box sx={containerStyle} title={t('anadido-al-carrito')}>
      <CheckCircleIcon sx={checkStyle} />
      <ShoppingCartIcon sx={cartStyle} />
      <Typography variant="subtitle" sx={textStyle}>
        {t('agregado')}
      </Typography>
    </Box>
  );
};

AddedToCartIcon.propTypes = {
  visible: PropTypes.bool,
};

export default AddedToCartIcon;
