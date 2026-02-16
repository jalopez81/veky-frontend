import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useI18n } from '../../context/I18nContext';

const classes = {
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap',
    },
};


const FormRadioButtons = memo(({
    hairType,
    setHairType,
    hairLength,
    setHairLength,
    dyeHairFrequency,
    setDyeHairFrequency,
    mainConcern,
    setMainConcern
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
            {/* Tipo de cabello */}
            <Typography variant="h6" fontWeight={'bold'}>
                {t('pregunta-tipo-cabello')}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    value={hairType}
                    onChange={(e) => setHairType(e.target.value)}
                    sx={classes.radioGroup}
                >
                    <FormControlLabel value="liso" control={<Radio />} label={t('liso')} />
                    <FormControlLabel
                        value="ondulado"
                        control={<Radio />}
                        label={t('ondulado')}
                    />
                    <FormControlLabel
                        value="rizado"
                        control={<Radio />}
                        label={t('rizado')}
                    />
                    <FormControlLabel
                        value="muyRizado"
                        control={<Radio />}
                        label={t('muy-rizado')}
                    />
                </RadioGroup>
            </FormControl>

            {/* Longitud del cabello */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                {t('pregunta-longitud-cabello')}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    sx={classes.radioGroup}
                    value={hairLength}
                    onChange={(e) => setHairLength(e.target.value)}
                >
                    <FormControlLabel value="corto" control={<Radio />} label={t('corto')} />
                    <FormControlLabel value="medio" control={<Radio />} label={t('medio')} />
                    <FormControlLabel value="largo" control={<Radio />} label={t('largo')} />
                </RadioGroup>
            </FormControl>

            {/* ¿Sueles teñir o tratar químicamente tu cabello? */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                {t('pregunta-tenido-quimico')}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    sx={classes.radioGroup}
                    value={dyeHairFrequency}
                    onChange={(e) => setDyeHairFrequency(e.target.value)}
                >
                    <FormControlLabel
                        value="Sí, frecuentemente"
                        control={<Radio />}
                        label={t('si-frecuentemente')}
                    />
                    <FormControlLabel
                        value="Ocasionalmente"
                        control={<Radio />}
                        label={t('ocasionalmente')}
                    />
                    <FormControlLabel
                        value="No, nunca"
                        control={<Radio />}
                        label={t('no-nunca')}
                    />
                </RadioGroup>
            </FormControl>

            {/* ¿Cuál es tu mayor preocupación relacionada con tu cabello? */}
            <Typography variant="h6" sx={{ marginTop: '3rem' }} fontWeight={'bold'}>
                {t('pregunta-mayor-preocupacion')}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    sx={classes.radioGroup}
                    value={mainConcern}
                    onChange={(e) => setMainConcern(e.target.value)}
                >
                    <FormControlLabel
                        value="Caída excesiva"
                        control={<Radio />}
                        label={t('caida-excesiva')}
                    />
                    <FormControlLabel value="Frizz" control={<Radio />} label={t('frizz')} />
                    <FormControlLabel
                        value="Falta de volumen"
                        control={<Radio />}
                        label={t('falta-de-volumen')}
                    />
                    <FormControlLabel
                        value="Daño por calor o tratamiento químico"
                        control={<Radio />}
                        label={t('dano-por-calor')}
                    />
                </RadioGroup>
            </FormControl>

        </Box>

    )
});

FormRadioButtons.displayName = 'FormRadioButtons';

FormRadioButtons.propTypes = {
    hairType: PropTypes.string,
    hairLength: PropTypes.string,
    dyeHairFrequency: PropTypes.string,
    mainConcern: PropTypes.string,
    setHairType: PropTypes.func,
    setHairLength: PropTypes.func,
    setDyeHairFrequency: PropTypes.func,
    setMainConcern: PropTypes.func,

};

export default FormRadioButtons