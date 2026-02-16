import { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import { fetchUsersReport } from '../../../helpers/reports';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import DatePickerComponent from '../shared/DatePicker1';
import ActiveUsersChart from './active-users-chart';
import { getColdefsActiveUsers, getColdefsLogins } from './colDefs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomAgGrid from '../shared/CustomAgGrid/';
import { useI18n } from '../../../context/I18nContext';

const UsersReportPage = () => {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [date_start, setDate_start] = useState('2024-01-01');
  const [date_end, setDate_end] = useState('2025-01-01');

  const getUsers = async (body) => {
    setIsLoading(true);

    try {
      const data = await fetchUsersReport(body);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching top-selling products data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers({ date_start, date_end });
  }, []);

  return (
    <PageContainer sx={{ backgroundColor: '#eeeeee' }}>
      <PageHeader
        title={t('reporte-usuarios-activos') || "Reporte de usuarios activos"}
        isLoading={isLoading}
      ></PageHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          marginTop: 2,
          alignItems: 'center',
        }}
      >
        <DatePickerComponent
          setDate_start={setDate_start}
          setDate_end={setDate_end}
          date_start={date_start}
          date_end={date_end}
        />

        <Button
          variant="contained"
          onClick={() => getUsers({ date_start, date_end })}
        >
          {t('actualizar')}
        </Button>
      </Box>
      <Box
        className="users-charts"
        sx={{ height: '300px', width: '100%', margin: '1rem' }}
      >
        <ActiveUsersChart users={users.allUsers} />
      </Box>
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            {t('ver-ocultar-usuarios-activos')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAgGrid
            colDefs={getColdefsActiveUsers(t)}
            rowData={users.allUsers}
            width="100%"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={{ marginTop: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #cecece' }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            {t('ver-ocultar-logins')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomAgGrid
            colDefs={getColdefsLogins(t)}
            rowData={users.logins}
            width="100%"
          />
        </AccordionDetails>
      </Accordion>
    </PageContainer>
  );
};

export default UsersReportPage;
