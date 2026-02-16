import {
    Box,
    TextField,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useI18n } from '../../context/I18nContext';

const FormTextFields = memo(({
    scalpCondition,
    setScalpCondition,
    currentIssues,
    setCurrentIssues,
    goals,
    setGoals

}) => {
    const { t } = useI18n();
    return (
        <Box
            sx={{
                width: '100%',
                padding: '1rem',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Condición del cuero cabelludo */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                {t('pregunta-condicion-cuero-cabelludo')}
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t('placeholder-cuero-cabelludo')}
                value={scalpCondition}
                sx={{ background: 'white' }}
                onChange={(e) => setScalpCondition(e.target.value)}
            />

            {/* Problemas actuales */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                {t('pregunta-problemas-especificos')}
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t('placeholder-problemas')}
                value={currentIssues}
                sx={{ background: 'white' }}
                onChange={(e) => setCurrentIssues(e.target.value)}
            />

            {/* Objetivos */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                {t('pregunta-resultados-esperados')}
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t('placeholder-resultados')}
                value={goals}
                sx={{ background: 'white' }}
                onChange={(e) => setGoals(e.target.value)}
            />
        </Box>
    )
});

FormTextFields.displayName = 'FormTextFields';

FormTextFields.propTypes = {
    scalpCondition: PropTypes.string,
    currentIssues: PropTypes.string,
    goals: PropTypes.string,
    setScalpCondition: PropTypes.func,
    setCurrentIssues: PropTypes.func,
    setGoals: PropTypes.func,
};

export default FormTextFields