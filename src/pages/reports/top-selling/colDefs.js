import { currencyFormatter, percentageFormatter } from '../shared/helpers';

export const getColumnDefsTopSelling = (isMobile, t) => {
  const columnDefs = [
    { headerName: t('producto'), field: "product_name", mobile: true, sortable: true, cellStyle: { textAlign: 'center' }, filter: true },
    { headerName: t('categoria'), field: "category", mobile: false, sortable: true, cellStyle: { textAlign: 'center' }, filter: true },
    { headerName: t('cantidad'), field: "quantity_sold", mobile: true, sortable: true, cellStyle: { textAlign: 'center' }, filter: true },
    { headerName: t('fecha'), field: "date", mobile: false, sortable: true, cellStyle: { textAlign: 'center' }, filter: true },
    { headerName: t('ingresos'), field: "revenue", mobile: false, sortable: true, cellStyle: { textAlign: 'right' }, filter: true, valueFormatter: currencyFormatter },
    { headerName: t('participacion'), field: "sales_percentage", mobile: true, sortable: true, cellStyle: { textAlign: 'center' }, filter: true, valueFormatter: percentageFormatter },
  ];

  return columnDefs.filter((col) => (isMobile ? col.mobile : col));
};
