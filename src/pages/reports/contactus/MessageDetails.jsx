import { Box, Button, Typography, Backdrop } from '@mui/material';
import PropTypes from 'prop-types';
import { apiDeleteComment, apiSetCommentAsRead } from '../../../api/api';
import { useI18n } from '../../../context/I18nContext';
import { useEffect } from 'react';

const MessageDetails = ({ msg, open, setOpen, onMarkedRead, onDelete }) => {
  const { t } = useI18n();

  // Cerrar con la tecla Escape (Buena práctica de accesibilidad)
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRead = async () => {
    if (open && msg && !msg.read) {
      try {
        await apiSetCommentAsRead(msg.id, { read: true });
        onMarkedRead(msg.id, true);
      } catch (error) {
        console.error("No se pudo marcar como leído", error);
      }
    }
    handleClose();
  };

  const handleUnread = async () => {
    if (open && msg && msg.read) {
      try {
        await apiSetCommentAsRead(msg.id, { read: false });
        onMarkedRead(msg.id, false);
      } catch (error) {
        console.error("No se pudo marcar como no leído", error);
      }
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (open && msg) {
      try {
        await apiDeleteComment(msg.id);
        onDelete(msg.id);
      } catch (error) {
        console.error("No se pudo borrar el mensaje", error);
      }
    }
    handleClose();
  };

  if (!msg) return null;

  return (
    <>
      {/* Capa oscura de fondo que detecta el clic exterior */}
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ 
          zIndex: 9, 
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(2px)' // Efecto de desenfoque opcional
        }}
      />

      {/* Contenedor del Mensaje */}
      <Box
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro cierre el modal
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          left: '50%',
          maxWidth: '600px',
          opacity: open ? 1 : 0,
          padding: '30px',
          position: 'fixed',
          top: '50%',
          transform: open 
            ? 'translate(-50%, -50%) scale(1)' 
            : 'translate(-50%, -45%) scale(0.95)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          visibility: open ? 'visible' : 'hidden',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          outline: 'none',
          zIndex: 10,
        }}
      >
        <Typography variant="h6" color="primary" gutterBottom>
          {t('detalles-mensaje') || "Detalles del Mensaje"}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {t('nombre')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {msg.name}
          </Typography>

          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {msg.email}
          </Typography>

          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {t('mensaje')}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 4 }}>
            {msg.message}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: 1.5,
            pt: 2,
            borderTop: '1px solid #eee'
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            {t('cerrar')}
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
            onClick={handleDelete}
          >
            {t('borrar')}
          </Button>

          {msg.read ? (
            <Button variant="contained" color="warning" onClick={handleUnread}>
              {t('marcar-no-leido')}
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleRead}>
              {t('marcar-leido')}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

MessageDetails.propTypes = {
  msg: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onMarkedRead: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MessageDetails;