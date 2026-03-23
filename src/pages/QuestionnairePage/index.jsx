import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
    Fade,
    Grow
} from '@mui/material';
import { useState, useRef } from 'react';
import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import ProductCardHorizontal from '../../components/ProductCard/ProductCardHorizontal';
import NavigationButton from '../../components/navigation-button';
import randomlyFormatParagraph from '../../helpers/randomlyFormatParragraph';
import FormRadioButtons from './FormRadioButtons';
import FormTextFields from './FormTextFields';
import { apiPostQuestionnaire } from '../../api/api';
import { useI18n } from '../../context/I18nContext';

const QuestionnairePage = () => {
    const { t, currentLanguage } = useI18n();
    const resultsRef = useRef(null); // Referencia para scroll automático
    
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Agrupamos el estado para mayor limpieza
    const [formData, setFormData] = useState({
        hairType: 'rizado',
        hairLength: 'largo',
        dyeHairFrequency: 'Sí, frecuentemente',
        mainConcern: 'Caída excesiva',
        scalpCondition: 'saludable',
        currentIssues: 'resequedad por el calor',
        goals: 'quiero un spray para cuidarlo del calor',
    });

    const [recommendations, setRecommendations] = useState([]);
    const [generalTips, setGeneralTips] = useState('');
    const [generalTipsImageUrl, setGeneralTipsImageUrl] = useState(null);

    const generalTipsUrlList = [
        '/img/happy-woman1.jpg', '/img/happy-woman2.jpg', '/img/happy-woman3.jpg',
        '/img/happy-woman4.jpg', '/img/happy-woman5.jpg', '/img/happy-woman6.jpg',
        '/img/happy-woman7.jpg', '/img/happy-woman8.jpg',
    ];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * generalTipsUrlList.length);
        setGeneralTipsImageUrl(generalTipsUrlList[randomIndex]);
    };

    const handleSubmit = async () => {
        setShowResults(false);
        setIsLoading(true);

        try {
            const response = await apiPostQuestionnaire({
                ...formData,
                language: currentLanguage
            });
            
            setRecommendations(response.recommendations);
            setGeneralTips(response.generalTips);
            getRandomImage();
            setShowResults(true);

            // Scroll suave a los resultados después de un breve delay
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

        } catch (error) {
            console.error(t('error-enviando-respuestas'), error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer>
            <PageHeader
                title={t('asistente-ia-belleza')}
                subtitle={t('sistema-inteligente-analizara')}
            >
                <NavigationButton href="/home" text={t('inicio') + ' ►'} />
            </PageHeader>

            {/* Formulario */}
            <Box sx={{ mb: 4 }}>
                <FormRadioButtons 
                    {...formData} 
                    setHairType={(val) => setFormData({...formData, hairType: val})}
                    setHairLength={(val) => setFormData({...formData, hairLength: val})}
                    setDyeHairFrequency={(val) => setFormData({...formData, dyeHairFrequency: val})}
                    setMainConcern={(val) => setFormData({...formData, mainConcern: val})}
                />

                <FormTextFields
                    {...formData}
                    setScalpCondition={(val) => setFormData({...formData, scalpCondition: val})}
                    setCurrentIssues={(val) => setFormData({...formData, currentIssues: val})}
                    setGoals={(val) => setFormData({...formData, goals: val})}
                />

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        sx={{ borderRadius: '20px', px: 4 }}
                    >
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('enviar-respuestas')}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ my: 4, borderTop: 'dashed 2px #ccc' }} ref={resultsRef}></Box>

            {/* Estado de Carga */}
            {isLoading && (
                <Fade in={isLoading}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            {t('buscando-resultados')}
                        </Typography>
                        <CircularProgress />
                    </Box>
                </Fade>
            )}

            {/* Resultados */}
            {showResults && !isLoading && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                        justifyContent: 'center',
                        p: 2,
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                        animation: 'fadeIn 0.8s ease-in-out'
                    }}
                >
                    {/* Columna Izquierda: Tips e Imagen */}
                    <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grow in={showResults}>
                            <Paper elevation={3} sx={{ p: 1, mb: 2, borderRadius: '15px', overflow: 'hidden' }}>
                                {generalTipsImageUrl && (
                                    <img
                                        src={generalTipsImageUrl}
                                        alt="Recomendación"
                                        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                                    />
                                )}
                            </Paper>
                        </Grow>
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{ __html: generalTips }}
                            sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: '10px' }}
                        />
                    </Box>

                    {/* Columna Derecha: Productos */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        {recommendations.map((product, index) => (
                            <Fade in={showResults} timeout={(index + 1) * 500} key={product.id}>
                                <Box sx={{ mb: 3, maxWidth: '400px', justifyCointent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ProductCardHorizontal
                                        product={product}
                                        isProductInCart={false}
                                        disableLinkToDetails
                                    />
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        sx={{ 
                                            mt: 1, 
                                            p: 1.5, 
                                            fontStyle: 'italic', 
                                            borderLeft: '3px solid #ccc',
                                            ml: 2 
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: randomlyFormatParagraph(product.recommendation),
                                        }}
                                    />
                                </Box>
                            </Fade>
                        ))}
                    </Box>
                </Box>
            )}
        </PageContainer>
    );
};

export default QuestionnairePage;