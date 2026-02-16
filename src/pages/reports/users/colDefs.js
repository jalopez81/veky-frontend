export const getColdefsActiveUsers = (t) => [
  { headerName: "Id", field: "id", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
  { headerName: t('usuario'), field: "username", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
  { headerName: "Email", field: "email", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
  { headerName: t('active') || "Active", field: "active", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
];

export const getColdefsLogins = (t) => [
  { headerName: "Id", field: "user_id", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
  { headerName: t('usuario'), field: "username", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
  { headerName: t('logins') || "Logins", field: "logins", sortable: true, filter: true, cellStyle: { textAlign: 'left' } },
];
