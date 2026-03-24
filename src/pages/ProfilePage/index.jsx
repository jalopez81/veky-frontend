import { Button, Typography, Stack, CircularProgress } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import NavigationButton from '../../components/navigation-button';
import { useI18n } from '../../context/I18nContext';
import ProfileForm from '../../components/ProfileForm';
import { useUserProfile } from '../../hooks/useUserProfile';
import CreditCardSection from '../../components/CreditCardSection';

const UserProfilePage = () => {
  const { t } = useI18n();
  const { profile, setProfile, loading, status, updateProfile, setEditingCard,
    editingCard, card, setCard, saveCard, removeCard } = useUserProfile();

  if (loading) return <PageContainer>
    <PageHeader title={profile.username}>
      <NavigationButton href="/products" text={`${t('productos')} ►`} />
      <Stack alignItems="center"><CircularProgress /></Stack>;
    </PageHeader>
  </PageContainer>


  return (
    <PageContainer>
      <PageHeader title={profile.username}>
        <NavigationButton href="/products" text={`${t('productos')} ►`} />
      </PageHeader>

      <Stack spacing={3} sx={{ alignItems: 'center', background: 'white', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>{t('informacion-perfil')}</Typography>

        {status.error && <Typography color="error">{status.error}</Typography>}
        {status.success && <Typography color="success">{status.success}</Typography>}

        <ProfileForm profile={profile} setProfile={setProfile} t={t} />

        <CreditCardSection
          card={card} setCard={setCard}
          editing={editingCard} setEditing={setEditingCard}
          onSave={saveCard} onRemove={removeCard} t={t}
        />

        {!editingCard && (
          <Button variant="contained" onClick={() => updateProfile(profile)}>
            {t('guardar-cambios')}
          </Button>
        )}

      </Stack>
    </PageContainer>
  );
};

export default UserProfilePage;