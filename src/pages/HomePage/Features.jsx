import { Box, Typography } from '@mui/material';
import { useI18n } from '../../context/I18nContext';

const Features = () => {
  const { t } = useI18n();
  return (
    <Box
      sx={{
        textAlign: 'center',
        marginBottom: 6,
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      {[
        {
          titleKey: 'calidad-garantizada',
          descriptionKey: 'calidad-garantizada-desc',
        },
        {
          titleKey: 'recomendaciones-personalizadas',
          descriptionKey: 'recomendaciones-personalizadas-desc',
        },
        {
          titleKey: 'envios-rapidos',
          descriptionKey: 'envios-rapidos-desc',
        },
      ].map((feature, index) => (
        <Box
          key={index}
          sx={{
            outline: 'solid 1px #ccc',
            padding: 2,
            borderRadius: 1,
            margin: 2,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '150px',
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {t(feature.titleKey)}
          </Typography>
          <Typography>{t(feature.descriptionKey)}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Features;
