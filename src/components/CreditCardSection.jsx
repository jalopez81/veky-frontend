import {Stack, Box, Typography, Button, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
import LabelBg from './shared/LabelWithBg';
import { useI18n } from '../context/I18nContext';
// proptypes
import PropTypes from 'prop-types';

const CreditCardSection = ({ card, setCard, editing, setEditing, onSave, onRemove }) => {
    const { t } = useI18n();
  return (
    <Box id="card-number-box" sx={{
      display: 'flex', alignItems: 'center', flexDirection: 'column',
      border: '1px double #ccc', borderRadius: '8px', padding: '1rem', mb: 4, width: '100%'
    }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{t('tarjeta-credito')}</Typography>

      {card.hasCard && !editing && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="body1"><strong>{card.holder}</strong></Typography>
          <Typography variant="body2">{t('direccion')}: {card.billing}</Typography>
          <Typography variant="body2">{t('numero')}: {card.number}</Typography>
          <Typography variant="body2">{t('expiracion')}: {card.expiration}</Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" size="small" onClick={onRemove}>{t('eliminar')}</Button>
            <Button variant="contained" size="small" onClick={() => setEditing(true)}>{t('editar')}</Button>
          </Box>
        </Box>
      )}

      {!card.hasCard && !editing && (
        <Button variant="contained" onClick={() => setEditing(true)}>{t('agregar-tarjeta')}</Button>
      )}

      {editing && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField label={<LabelBg>{t('nombre-y-apellido')}</LabelBg>} fullWidth 
            value={card.holder} onChange={e => setCard({...card, holder: e.target.value})} />
          
          <TextField label={<LabelBg>{t('direccion')}</LabelBg>} fullWidth 
            value={card.billing} onChange={e => setCard({...card, billing: e.target.value})} />

          <InputMask mask="9999 9999 9999 9999" value={card.number} 
            onChange={e => setCard({...card, number: e.target.value.replace(/[^0-9]/g, '')})}>
            {() => <TextField label={<LabelBg>{t('numero-tarjeta')}</LabelBg>} fullWidth />}
          </InputMask>

          <InputMask mask="99/9999" value={card.expiration} 
            onChange={e => setCard({...card, expiration: e.target.value})}>
            {() => <TextField label={<LabelBg>{t('fecha-expiracion')}</LabelBg>} fullWidth />}
          </InputMask>

          <TextField label={<LabelBg>CVV</LabelBg>} fullWidth value={card.cvv} 
            onChange={e => setCard({...card, cvv: e.target.value})} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" onClick={() => setEditing(false)}>{t('cancelar')}</Button>
            <Button variant="contained" onClick={onSave}>{t('guardar-tarjeta')}</Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

CreditCardSection.propTypes = {
    card: PropTypes.object.isRequired,
    setCard: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    setEditing: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};


export default CreditCardSection;