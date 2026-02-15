import { currencyFormatter, dateFormatter } from '../shared/helpers';

export const STOCK_THRESHOLD = 10; // Define the stock threshold

export const getColumnDefsInventory = (isMobile, t) => {
  const columnDefs = [
    { headerName: t('id-prod'), field: "id", mobile: true, sortable: true, filter: true },
    { headerName: t('nombre'), field: "name", mobile: true, sortable: true, filter: true },
    { headerName: t('sku'), field: "sku", mobile: false, sortable: true, filter: true },
    { headerName: t('precio'), field: "price", mobile: false, sortable: true, filter: true, valueFormatter: currencyFormatter },
    { headerName: t('categoria'), field: "category", mobile: false, sortable: true, filter: true },
    { headerName: t('stock'), field: "stock", mobile: false, sortable: true, filter: true },
    {
      headerName: t('estado'),
      field: "stock",
      mobile: true,
      sortable: true,
      filter: true,
      valueGetter: (params) => {
        const stock = params.data.stock;
        let state = t('disponible');

        if (stock < STOCK_THRESHOLD) {
          state = t('bajo-stock');
        }

        if (stock === 0) {
          state = t('agotado');
        }
        return state;
      },
      cellStyle: (params) => {
        const stock = params.data.stock;
        if (stock === 0) {
          return { color: 'red', fontWeight: 'bold' };
        } else if (stock < STOCK_THRESHOLD) {
          return { color: 'orange', fontWeight: 'bold' };
        } else {
          return { color: '#000000' };
        }
      },
    },
  ];

  return columnDefs.filter((col) => (isMobile ? col.mobile : col));
};

export const getColumnDefsInventoryHistory = (isMobile, t) => {
  const columnDefs = [
    { headerName: t('fecha'), field: "date", mobile: true, sortable: true, filter: true, valueFormatter: dateFormatter },
    { headerName: t('cantidad'), field: "quantity", mobile: false, sortable: true, filter: true },
    { headerName: t('nombre'), field: "name", mobile: true, sortable: true, filter: true },
    { headerName: t('categoria'), field: "category", mobile: false, sortable: true, filter: true },
    {
      headerName: t('tipo-operacion'), field: "operation_type", mobile: true, sortable: true, filter: true,
      valueFormatter: (params) => {
        const val = params.value;
        if (val === "entrada") return t('entrada');
        if (val === "salida") return t('salida');
        if (val === "actualizacion") return t('actualizacion');
        return val;
      },
      cellStyle: (params) => {
        const operation_type = params.data.operation_type;
        let color = "#000000";

        if (operation_type === "entrada") {
          color = "#008000";
        }
        if (operation_type === "salida") {
          color = "red";
        }
        if (operation_type === "actualizacion") {
          color = "orange";
        }

        return { color: color };
      }
    },
  ];

  return columnDefs.filter((col) => (isMobile ? col.mobile : col));
};
