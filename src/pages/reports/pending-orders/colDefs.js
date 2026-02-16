import { currencyFormatter, dateFormatter } from '../shared/helpers';

export const getColumnDefsPendingOrders = (isMobile, t) => {
  const colDefs = [
    { headerName: "Id", field: "user_id", mobile: true, sortable: true, cellStyle: { textAlign: 'left' }, filter: true },
    { headerName: t('usuario'), field: "username", mobile: true, sortable: true, cellStyle: { textAlign: 'left' }, filter: true },
    { headerName: "Email", field: "email", mobile: false, sortable: true, cellStyle: { textAlign: 'left' }, filter: true },
    { headerName: t('total'), field: "total_price", mobile: true, sortable: true, cellStyle: { textAlign: 'center' }, filter: true, valueFormatter: currencyFormatter },
    { headerName: t('fecha'), field: "created_at", mobile: true, sortable: true, cellStyle: { textAlign: 'left' }, filter: true, valueFormatter: dateFormatter },
    {
      headerName: t('estado'),
      field: "status",
      mobile: false,
      sortable: true,
      cellStyle: { textAlign: 'left' },
      filter: true,
      valueFormatter: (params) => {
        const val = params.value;
        if (val === 'pending') return t('pendiente');
        if (val === 'paid') return t('pagado');
        if (val === 'cancelled') return t('cancelado');
        return val;
      }
    },
  ];

  return colDefs.filter((col) => (isMobile ? col.mobile : col));
};
