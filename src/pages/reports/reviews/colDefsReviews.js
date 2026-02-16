export const getColDefsReviews = (t) => [
  { headerName: "Id", field: "product_id", sortable: true, filter: true },
  { headerName: t('nombre'), field: "name", sortable: true, filter: true },
  { headerName: "SKU", field: "sku", sortable: true, filter: true },
  { headerName: t('categoria'), field: "category", sortable: true, filter: true },
  { headerName: t('rating'), field: "average_rating", sortable: true, filter: true },
  { headerName: t('negativo'), field: "negativo", sortable: true, filter: true },
  { headerName: t('neutral'), field: "neutral", sortable: true, filter: true },
  { headerName: t('positivo'), field: "positivo", sortable: true, filter: true },
  { headerName: t('total-resenas'), field: "reviews", sortable: true, filter: true },
];
