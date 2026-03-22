
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Badge,
	Menu,
	MenuItem,
	IconButton,
	Divider,
	Drawer,
	Box,
} from '@mui/material';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useI18n } from '../../context/I18nContext';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CommentIcon from '@mui/icons-material/Comment';
import MenuIcon from '@mui/icons-material/Menu';
import DividerLine from '../shared/DividerLine';
import vekylogo from './vekylogo.png';
import { ROLES } from '../../constants';



const Navbar = () => {
	const { isAuthenticated, logout, cartCount, getUserRoles, getUsername } =
		useAppContext();
	const { t } = useI18n();

	const [anchorEl, setAnchorEl] = useState(null);
	const [userAnchorEl, setUserAnchorEl] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const isToolsActive = location.pathname.startsWith('/tools');

	const classes = {
		desktopButton: {
			fontSize: '16px',
			transition: 'all 330ms ease-in-out',
			fontWeight: 300,
			margin: '0 4px',
			position: 'relative',
			color: "primary.main",
			textTransform: 'capitalize',
			borderRadius: 0, 
			borderBottom: '2px solid transparent',
			'&.active': {
				borderBottom: '2px solid #00a40f', 
			},			
			'&:hover': {
				borderBottom: theme => `2px solid ${theme.palette.primary.main}`,
				color: theme => theme.palette.primary.main,
			},
		}
	}

	// Handle opening the menu
	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// Handle closing the menu
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Open user menu
	const openUserMenu = (event) => {
		setUserAnchorEl(event.currentTarget);
	};

	// close user menu
	const closeUserMenu = () => {
		setUserAnchorEl(null);
	};

	const [mobileOpen, setMobileOpen] = useState(false);
	const [toolsOpen, setToolsOpen] = useState(false);

	// Toggle mobile drawer
	const toggleMobileDrawer = () => {
		setMobileOpen(!mobileOpen);
	};

	const toggleToolsDrawer = () => {
		setToolsOpen(!toolsOpen);
	};

	function LanguageSelector() {
		const { changeLanguage, currentLanguage } = useI18n();

		return (
			<Box sx={{ display: 'flex', gap: 1 }}>
				{currentLanguage === 'en' && (
					<Button
						size="small"						
						variant="text"
						onClick={() => changeLanguage('es')}
						sx={{ minWidth: '60px' }}
					>
						EN
					</Button>
				)}
				{currentLanguage === 'es' && (
					<Button
						size="small"						
						variant="text"
						onClick={() => changeLanguage('en')}
						sx={{ minWidth: '60px' }}
					>
						ES
					</Button>
				)}
			</Box>
		);
	}

	return (
		<>
			{/* DESKTOP Navbar */}
			<AppBar
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					display: { xs: 'none', md: 'flex' },
					boxShadow: 'none'
				}}
				className="navbar"
			>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'end',
						flexWrap: 'wrap',
						padding: '0.7rem',
						fontSize: { xs: '10px', md: '11px' },
						backgroundColor: 'background.main'
					}}
					className="navbar"
				>
					<img
						style={{
							width: '100px',
							height: 'auto',
							position: 'absolute',
							left: '1rem',
							cursor: 'pointer'
						}}
						src={vekylogo}
						onClick={() => navigate('/')}
						alt=""
					/>
					<Button
						component={NavLink}
						size="small"
						to="/"
						startIcon={<HomeIcon />}
						variant='text'
						sx={{ ...classes.desktopButton, marginLeft: "100px" }}

					>
						{t('inicio')}
					</Button>					
					<Button
						variant='text'
						sx={{ color: "#ffffff", ...classes.desktopButton }}

						component={NavLink}
						size="small"
						to="/products"
						startIcon={<ShoppingBasketIcon />}
					>
						{t('productos')}
					</Button>
					<Button
						color="inherit"
						component={NavLink}
						size="small"
						to="/questionnare"
						startIcon={<AutoAwesomeIcon />}
						variant='text'
						sx={{ ...classes.desktopButton }}

					>
						{t('descubre')}
					</Button>					
					{isAuthenticated && (
						<>
							{getUserRoles().includes(ROLES.admin) && (
								<>
									<Button
										color="inherit"
										onClick={handleMenuClick}
										startIcon={<SettingsIcon />}
										variant='text'
										className= {isToolsActive ? 'active' : ''}
										sx={{
											fontWeight: 'bold',
											fontSize: 'inherit',
											...classes.desktopButton

										}}
									>
										{t('herramientas')}
									</Button>
								</>
							)}
						</>
					)}
					<Button
						color="inherit"
						component={NavLink}
						size="small"
						to="/about-us"
						startIcon={<Diversity3Icon />}
						variant='text'
						sx={{ ...classes.desktopButton }}

					>
						{t('acerca-de-nosotros')}
					</Button>
					<Button
						color="inherit"
						component={NavLink}
						size="small"
						to="/contactus"
						startIcon={<CallIcon />}
						variant='text'
						sx={{ ...classes.desktopButton }}

					>
						{t('contactanos')}
					</Button>
					<Button
						color="inherit"
						component={NavLink}
						size="small"
						to="/cart"
						startIcon={<ShoppingCartIcon />}
						variant='text'
						sx={{ ...classes.desktopButton }}

					>
						<Badge badgeContent={cartCount} color="secondary">
							{t('carrito')} &nbsp;
						</Badge>
					</Button>
					{!isAuthenticated && (
						<Button
							color="inherit"
							component={Link}
							size="small"
							to="/login"
							startIcon={<LoginIcon />}
							variant='text'
							sx={{ ...classes.desktopButton }}

						>
							{t('iniciar-sesion')}
						</Button>
					)}

					{/* iAuthenticated  */}
					{isAuthenticated && (
						<>
							<Button
								color="inherit"
								component={NavLink}
								size="small"
								to="/wishlist"
								startIcon={<FavoriteIcon />}
								variant='text'
								sx={{ ...classes.desktopButton }}

							>
								{t('lista-de-favoritos')}
							</Button>
							{getUserRoles().includes(ROLES.admin) && (
								<>
									<Menu
										anchorEl={anchorEl}
										open={Boolean(anchorEl)}
										onClose={handleMenuClose}
										MenuListProps={{
											'aria-labelledby': 'herramientas-button',
										}}
										sx={{
											'& .MuiPopover-paper': {
												backgroundColor: '#ffffff',
												padding: '4px',
											},
										}}
									>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/sales"
											onClick={handleMenuClose}
										>
											<AttachMoneyIcon
												sx={{ fontSize: 18, marginRight: '.6rem' }}
											/>{' '}
											{t('reporte-de-ventas')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/top-selling"
											onClick={handleMenuClose}
										>
											<EmojiEventsIcon
												sx={{ fontSize: 18, marginRight: '.6rem' }}
											/>{' '}
											{t('productos-mas-vendidos')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/pending-orders"
											onClick={handleMenuClose}
										>
											<ProductionQuantityLimitsIcon
												sx={{ fontSize: 18, marginRight: '.6rem' }}
											/>{' '}
											{t('ordenes-pendientes')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/inventory"
											onClick={handleMenuClose}
											divider
										>
											<InventoryIcon
												sx={{ fontSize: 18, marginRight: '.6rem' }}
											/>{' '}
											{t('reporte-de-inventario')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/users"
											onClick={handleMenuClose}
										>
											<PersonIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
											{t('reporte-de-usuarios-activos')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/reviews"
											onClick={handleMenuClose}
										>
											<CommentIcon
												sx={{ fontSize: 18, marginRight: '.6rem' }}
											/>{' '}
											{t('reporte-de-comentarios')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/reports/contactus"
											onClick={handleMenuClose}
											divider
										>
											<EmailIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
											{t('reporte-de-contactanos')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/inventory"
											onClick={handleMenuClose}
										>
											{t('inventario')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/add-new-product"
											onClick={handleMenuClose}
										>
											{t('agregar-producto')}
										</MenuItem>
										<MenuItem
											component={Link}
											size="small"
											to="/tools/users/roles"
											onClick={handleMenuClose}
										>
											{t('permisos-de-usuario')}
										</MenuItem>
									</Menu>
								</>
							)}
							<Button
								color="inherit"
								onClick={openUserMenu}
								startIcon={<PersonIcon />}
								variant='text'
								sx={{
									fontWeight: 'bold',
									...classes.desktopButton

								}}
							>
								{t('hola')} {`(${getUsername()})`}
							</Button>

							{/* user menu  */}
							<Menu
								anchorEl={userAnchorEl}
								open={Boolean(userAnchorEl)}
								onClose={closeUserMenu}
								MenuListProps={{
									'aria-labelledby': 'user-button',
								}}
								sx={{
									'& .MuiPopover-paper': {
										backgroundColor: '#ffffff',
										padding: '4px',
									},
								}}
							>
								<Button
									color="inherit"
									component={Link}
									to="/profile"
									startIcon={<PersonIcon />}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									{t('mi-perfil')}
								</Button>
								<Button
									color="inherit"
									component={Link}
									to="/my-orders"
									startIcon={<ShoppingBasketIcon />}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									{t('mis-pedidos')}
								</Button>
								<Button
									color="inherit"
									onClick={logout}
									startIcon={<LogoutIcon />}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									{t('salir')} ({getUsername()})
								</Button>
							</Menu>
						</>
					)}
					<LanguageSelector />
				</Toolbar>
			</AppBar>

			{/* MOBILE Navbar */}
			<AppBar sx={{ display: { xs: 'flex', md: 'none',  boxShadow: 'none' }, padding: 2, background: theme=>theme.palette.background.main }}>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<img
						style={{ width: '100px', height: 'auto' }}
						src={vekylogo}
						alt=""
						onClick={() => navigate('/')}
					/>
					<IconButton  onClick={toggleMobileDrawer}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* MOBILE main drawer */}
			<Drawer anchor="left" open={mobileOpen} onClose={toggleMobileDrawer}>
				<Box
					sx={{
						width: 250,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
						padding: '1rem',
					}}
					role="presentation"
					onClick={toggleMobileDrawer}
					onKeyDown={toggleMobileDrawer}
				>
					<Typography variant="h6" sx={{ p: 2 }}>
						{t('menu')}
					</Typography>
					<Divider />
					<Button
						color="secoind"
						component={Link}
						size="small"
						to="/"
						startIcon={<HomeIcon />}
					>
						{t('inicio')}
					</Button>
					<Button
						color="warning"
						component={Link}
						size="small"
						to="/products"
						startIcon={<ShoppingBasketIcon />}
					>
						{t('productos')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/questionnare"
						startIcon={<AutoAwesomeIcon />}
					>
						{t('descubre')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/about-us"
						startIcon={<Diversity3Icon />}
					>
						{t('acerca-de-nosotros')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/contactus"
						startIcon={<CallIcon />}
					>
						{t('contactanos')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/wishlist"
						startIcon={<FavoriteIcon />}
					>
						{t('wishlist')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/cart"
						startIcon={<ShoppingCartIcon />}
					>
						<Badge badgeContent={cartCount} color="secondary">
							{t('carrito')} &nbsp;
						</Badge>
					</Button>
					<DividerLine />
					{isAuthenticated && (
						<>
							{getUserRoles().includes(ROLES.admin) && (
								<Button
									color="inherit"
									component={Link}
									size="small"
									startIcon={<SettingsIcon />}
									onClick={(e) => {
										e.stopPropagation();
										toggleToolsDrawer();
									}}
									sx={{ justifyContent: 'start', width: '100%' }}
								>
									{t('herramientas')}
								</Button>
							)}
							<Button
								color="inherit"
								component={Link}
								to="/profile"
								startIcon={<PersonIcon />}
								sx={{ justifyContent: 'start', width: '100%' }}
							>
								{t('mi-perfil')}
							</Button>
							<Button
								color="inherit"
								component={Link}
								to="/my-orders"
								startIcon={<ShoppingBasketIcon />}
								sx={{ justifyContent: 'start', width: '100%' }}
							>
								{t('mis-pedidos')}
							</Button>
							<Button
								color="inherit"
								onClick={logout}
								startIcon={<LogoutIcon />}
								sx={{ justifyContent: 'start', width: '100%' }}
							>
								{t('salir')} ({getUsername()})
							</Button>
						</>
					)}
					{!isAuthenticated && (
						<Button
							color="inherit"
							component={Link}
							size="small"
							to="/login"
							sx={{ justifyContent: 'start', width: '100%' }}
						>
							{t('iniciar-sesion')}
						</Button>
					)}
				</Box>
			</Drawer>

			{/* MOBILE tools drawer */}
			<Drawer
				id="tools-drawer"
				anchor="left"
				open={toolsOpen}
				onClose={toggleToolsDrawer}
			>
				<Box
					sx={{
						width: 250,
						padding: 2,
					}}
					role="presentation"
					onClick={toggleToolsDrawer}
					onKeyDown={toggleToolsDrawer}
				>
					<Typography variant="h6" sx={{ mb: 2 }}>
						{t('herramientas')}
					</Typography>
					<Divider />
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/tools/reports/sales"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<AttachMoneyIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
						{t('reporte-de-ventas')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/tools/reports/top-selling"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<EmojiEventsIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
						{t('productos-mas-vendidos')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/tools/reports/pending-orders"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<ProductionQuantityLimitsIcon
							sx={{ fontSize: 18, marginRight: '.6rem' }}
						/>{' '}
						{t('ordenes-pendientes')}
					</Button>
					<Button
						color="inherit"
						component={Link}
						size="small"
						to="/tools/reports/inventory"
						sx={{ justifyContent: 'start', width: '100%' }}
					>
						<InventoryIcon sx={{ fontSize: 18, marginRight: '.6rem' }} />{' '}
						{t('reporte-de-inventario')}
					</Button>
					<DividerLine />
					<MenuItem
						component={Link}
						size="small"
						to="/tools/inventory"
						onClick={handleMenuClose}
					>
						{t('inventario')}
					</MenuItem>
					<MenuItem
						component={Link}
						size="small"
						to="/tools/add-new-product"
						onClick={handleMenuClose}
					>
						{t('agregar-producto')}
					</MenuItem>
					<MenuItem
						component={Link}
						size="small"
						to="/users/roles"
						onClick={handleMenuClose}
					>
						{t('permisos-de-usuario')}
					</MenuItem>
				</Box>

			</Drawer>
		</>
	);
};

export default Navbar;
