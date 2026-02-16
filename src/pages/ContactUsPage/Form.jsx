import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { apiSendContactUs } from '../../api/api';
import { useI18n } from '../../context/I18nContext';


const Form = () => {
    const { t } = useI18n();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editing, setEditing] = useState(false);

    const editField = (e, setterFunction) => {
        const value = e.target.value;
        if (value !== '') {
            setEditing(true);
        }

        setterFunction(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            phone,
            additionalDetails,
            message,
        };
        const response = await apiSendContactUs(formData);

        if (response.status !== 201) {
            setEmail('');
            setName('');
            setPhone('');
            setAdditionalDetails('');
            setMessage('');
            setEditing(false);
            setSuccessMessage(t('gracias-por-contactarnos'));
        }
    };

    return (
        <Box
            id="contact-form"
            sx={{
                background: (theme) =>
                    `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                padding: '2rem',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: { xs: 'translateY(0)', md: 'translateY(-100px)' },
                paddingTop: { xs: '2rem', md: '8rem' },
            }}
        >
            <form>
                <Typography variant="h4" gutterBottom textAlign={'center'} mb={4}>
                    {t('envianos-tu-mensaje')}
                </Typography>
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            {t('nombre')}
                        </Typography>
                    }
                    name="name"
                    value={name}
                    onChange={(e) => editField(e, setName)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            {t('correo-electronico')}
                        </Typography>
                    }
                    name="email"
                    value={email}
                    onChange={(e) => editField(e, setEmail)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            {t('telefono')} ({t('opcional')})
                        </Typography>
                    }
                    name="phone"
                    value={phone}
                    onChange={(e) => editField(e, setPhone)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            {t('detalles-adicionales')} ({t('opcional')})
                        </Typography>
                    }
                    name="additionalDetails"
                    value={additionalDetails}
                    onChange={(e) => editField(e, setAdditionalDetails)}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label={
                        <Typography
                            sx={{ background: '#ffffff', padding: 0.5, borderRadius: 1 }}
                        >
                            {t('mensaje')}
                        </Typography>
                    }
                    name="message"
                    value={message}
                    onChange={(e) => editField(e, setMessage)}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2 }}
                />
                {successMessage && (
                    <Typography color="primary" sx={{
                        marginBottom: 2,
                        color: 'white',
                        fontSize: '1.5rem',
                        transition: 'all 0.3s ease',
                        opacity: editing ? 0 : 1,
                        transform: `translateY(${editing ? 10 : 0}px)`,
                    }}>
                        {successMessage}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        type="button" // Use "button" to prevent form submission
                        variant="outlined"
                        color="#ffffff"
                        onClick={() => {
                            setName('');
                            setEmail('');
                            setPhone('');
                            setAdditionalDetails('');
                            setMessage('');
                            setSuccessMessage('');
                        }}
                    >
                        {t('limpiar')}
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="#ffffff"
                        disabled={!name || !email || !message}
                        onClick={handleSubmit}
                    >
                        {t('enviar')}
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default Form