import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import useDeviceType from '../utils/isMobile';

const AboutUsPage = () => {
	const { isMobile } = useDeviceType();
	const { t } = useI18n();
	return (
		<PageContainer>
			<PageHeader />
			<Box
				sx={{
					margin: { sx: '0.5rem', md: '4rem' },
					maxWidth: '1000px',
					textAlign: 'center',
					padding: { sx: '0.5rem', md: '3rem' },
					backgroundColor: '#ffffff',
					borderRadius: '8px',
					boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Typography variant="h2" gutterBottom fontWeight={700}>
					{t('bienvenido-a-vekyrd')}
				</Typography>
				<Typography
					variant="body1"
					sx={{
						marginBottom: 2,
						lineHeight: 2,
						fontSize: '1.3rem',
						fontWeight: 700,
					}}
				>
					{t('about-us-intro')}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
						flexWrap: 'wrap',
						marginBottom: 4,
					}}
				>
					<img
						src="/img/social-media/linea.png"
						alt=""
						width={320}
						height={320}
					/>
					<img
						src="/img/social-media/shampoo.png"
						alt=""
						width={320}
						height={320}
					/>
				</Box>
				<Typography variant="h4" gutterBottom>
					{t('nuestra-vision')}
				</Typography>
				<Typography variant="body1" sx={{ marginBottom: 2, lineHeight: 2 }}>
					{t('vision-text-1')}
				</Typography>
				<Typography variant="body1" sx={{ marginBottom: 4, lineHeight: 2 }}>
					{t('vision-text-2')}
				</Typography>
				<Typography variant="h4" gutterBottom>
					{t('nuestra-promesa')}
				</Typography>
				<Typography variant="body1" sx={{ lineHeight: 2 }}>
					{t('promesa-intro')}
				</Typography>
				<ul
					style={{
						textAlign: 'left',
						display: 'inline-block',
						marginBottom: '2rem',
					}}
				>
					<li>
						{t('promesa-1')}
					</li>
					<li>{t('promesa-2')}</li>
					<li>
						{t('promesa-3')}
					</li>
				</ul>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					<Button
						variant="contained"
						size={isMobile ? 'small' : 'large'}
						color="primary"
						component={Link}
						to="/products"
					>
						{t('ver-productos')}
					</Button>
					<Button
						variant="outlined"
						size={isMobile ? 'small' : 'large'}
						color="secondary"
						component={Link}
						to="/contactus"
					>
						{t('contactanos')}
					</Button>
				</Box>
			</Box>
		</PageContainer>
	);
};

export default AboutUsPage;
