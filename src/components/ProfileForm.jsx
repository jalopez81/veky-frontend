import { TextField, Box } from '@mui/material';
import InputMask from 'react-input-mask';
import LabelBg from './shared/LabelWithBg';
import { t } from 'i18next';
import PropTypes from 'prop-types';

const ProfileForm = ({ profile, setProfile }) => (
  <Box sx={{ width: '100%' }}>
    <TextField label={<LabelBg>{t('usuario')}</LabelBg>} disabled value={profile.username} fullWidth sx={{ mb: 2 }} />
    <TextField 
      label={<LabelBg>{t('nombre')}</LabelBg>} 
      value={profile.firstName} 
      onChange={(e) => setProfile({...profile, firstName: e.target.value})} 
      fullWidth sx={{ mb: 2 }} 
    />
    <TextField 
      label={<LabelBg>{t('apellido')}</LabelBg>} 
      value={profile.lastName} 
      onChange={(e) => setProfile({...profile, lastName: e.target.value})} 
      fullWidth sx={{ mb: 2 }} 
    />
    <InputMask 
      mask="(999) 999-9999" 
      value={profile.phoneNumber} 
      onChange={(e) => setProfile({...profile, phoneNumber: e.target.value.replace(/[^0-9]/g, '')})}
    >
      {() => <TextField label={<LabelBg>{t('telefono')}</LabelBg>} fullWidth sx={{ mb: 2 }} />}
    </InputMask>
    <TextField 
      label={<LabelBg>{t('direccion')}</LabelBg>} 
      value={profile.address} 
      onChange={(e) => setProfile({...profile, address: e.target.value})} 
      fullWidth sx={{ mb: 8 }} 
    />
  </Box>
);

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired,
};

export default ProfileForm;