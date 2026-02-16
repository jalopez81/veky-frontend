import { useEffect, useState, useMemo } from 'react';
import { apiFetchContactUsReport } from '../../../api/api';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import MessageDetails from './MessageDetails';
import { Button, Chip, Typography } from '@mui/material';
import CustomAgGrid from '../shared/CustomAgGrid';
import PropTypes from 'prop-types';
import { useI18n } from '../../../context/I18nContext';

const MessagesPage = () => {
  const { t } = useI18n();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const VerButtonRenderer = (props) => {
    const handleClick = () => {
      setSelectedMessage(props.data);
      setOpen(true);
    };

    return (
      <Button size="small" variant="contained" onClick={handleClick}>
        {t('ver')}
      </Button>
    );
  };

  VerButtonRenderer.propTypes = {
    data: PropTypes.object.isRequired,
  };

  const columnDefsContactUs = useMemo(() => [
    { headerName: 'Id', field: 'id', sortable: true, filter: true },
    { headerName: t('fecha'), field: 'created_at', sortable: true, filter: true },
    { headerName: t('nombre'), field: 'name', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: t('mensaje'), field: 'message', sortable: true, filter: true },
    {
      headerName: t('leido'),
      field: 'read',
      cellRenderer: (params) => {
        const read = params.data.read;
        return (
          <Chip
            size="small"
            label={read ? t('leido') : t('no-leido')}
            color={read ? 'success' : 'default'}
          />
        );
      },
      cellStyle: {
        textAlign: 'center',
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: t('acciones'),
      field: null,
      sortable: false,
      filter: false,
      cellRenderer: VerButtonRenderer,
    },
  ], [t]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await apiFetchContactUsReport();
        setMessages(data);
      } catch (err) {
        setError(t('error-cargar-mensajes') || 'Error al cargar los mensajes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [t]);

  return (
    <PageContainer sx={{ position: 'relative' }}>
      <PageHeader title={t('mensajes-recibidos') || "Mensajes Recibidos"} />
      <MessageDetails msg={selectedMessage} open={open} setOpen={setOpen} />
      {loading ? (
        <Typography>{t('cargando-mensajes') || "Cargando mensajes..."}</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <CustomAgGrid
          colDefs={columnDefsContactUs}
          rowData={messages}
          width="100%"
        />
      )}
    </PageContainer>
  );
};

export default MessagesPage;
