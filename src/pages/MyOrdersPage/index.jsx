import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import NavigationButton from '../../components/navigation-button';
import { useEffect, useState, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import CustomAgGrid from '../reports/shared/CustomAgGrid';
import { apiFetchUserOrders } from '../../api/api';
import { dateFormatter } from '../reports/shared/helpers.js';
import useDeviceType from '../../utils/isMobile.js';
import SelectedOrder from './SelectedOrder.jsx';
import { useI18n } from '../../context/I18nContext';

const MyOrdersPage = () => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getUserOrders = async () => {
    setLoading(true);
    try {
      const data = await apiFetchUserOrders();
      setOrdersData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);

  // colDefs
  const statusRenderer = ({ value }) => {
    if (value === 'pending') {
      return <span style={{ color: 'orange' }}>{t('pendiente')}</span>;
    }
    if (value === 'paid') {
      return <span style={{ color: 'green' }}>{t('pagado')}</span>;
    }
    return <span style={{ color: 'red' }}>{t('cancelado')}</span>;
  };

  const VerButtonRenderer = (params) => {
    const handleClick = () => {
      console.log(params);
      setSelectedData(params.data);
      setOpenModal(true);
    };

    return (
      <Button size="small" variant="contained" onClick={handleClick}>
        {t('ver')}
      </Button>
    );
  };

  const columnDefsMyOrders = useMemo(() => [
    { headerName: t('fecha'), field: "created_at", mobile: true, sortable: true, filter: true, valueFormatter: dateFormatter },
    { headerName: t('codigo'), field: "order_hash", mobile: true, sortable: true, filter: true },
    { headerName: t('subtotal'), field: "subtotal", mobile: false, sortable: true, filter: true },
    { headerName: t('impuestos'), field: "taxes", mobile: false, sortable: true, filter: true },
    { headerName: t('total'), field: "total_price", mobile: false, sortable: true, filter: true },
    { headerName: t('metodo'), field: "payment_method", mobile: false, sortable: true, filter: true },
    { headerName: t('estado'), field: "status", mobile: true, sortable: true, filter: true, cellRenderer: statusRenderer },
    {
      headerName: t('acciones'),
      field: null,
      sortable: false,
      filter: false,
      cellRenderer: VerButtonRenderer,
    }
  ], [t]);

  const getColumnDefsMyOrders = (isMobile) =>
    columnDefsMyOrders.filter((col) => (isMobile ? col.mobile : col));

  const isMobile = useDeviceType().isMobile;

  return (
    <PageContainer>
      <PageHeader
        title={t('mis-pedidos')}
        subtitle={t('mis-pedidos-subtitle')}
        isLoading={loading}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <NavigationButton href="/products" text={`${t('productos')} ►`} />
        </Box>
      </PageHeader>
      <SelectedOrder
        data={selectedData}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
      <CustomAgGrid
        colDefs={getColumnDefsMyOrders(isMobile)}
        rowData={ordersData}
      />
    </PageContainer>
  );
};

export default MyOrdersPage;
