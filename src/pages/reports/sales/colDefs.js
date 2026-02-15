import { dateFormatter } from '../shared/helpers';

// Formatter for currency fields
const currencyFormatter = (params) => {
  return `${parseFloat(params.value).toFixed(2)}`;
};

export const getColumnDefs = (isMobile, t) => {
  const columnDefs = [
    { headerName: t('pedido') || "Pedido", field: "order_id", mobile: true, sortable: true, filter: true },
    { headerName: t('hash') || "Hash", field: "order_hash", mobile: false, sortable: true, filter: true },
    { headerName: t('fecha'), field: "created_at", mobile: false, sortable: true, filter: true, valueFormatter: dateFormatter },
    { headerName: t('usuario'), field: "user_id", mobile: false, sortable: true, filter: true },
    { headerName: t('metodo-pago') || "Método de pago", field: "payment_method", mobile: false, sortable: true, filter: true },
    { headerName: t('cantidad'), field: "quantity", mobile: false, sortable: true, filter: true },
    { headerName: t('id-prod'), field: "product_id", mobile: false, sortable: true, filter: true },
    { headerName: t('producto') || "Producto", field: "name", mobile: true, sortable: true, filter: true },
    { headerName: t('categoria'), field: "category", mobile: false, sortable: true, filter: true },
    { headerName: t('precio'), field: "price", mobile: true, sortable: true, filter: true, valueFormatter: currencyFormatter },
  ];

  return columnDefs.filter((col) => (isMobile ? col.mobile : col));
};
