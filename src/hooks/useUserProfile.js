import { useState, useEffect } from 'react';
import { getFromDate } from '../utils/getFromDate';
import { useI18n } from '../context/I18nContext';
import { apiCreateCreditCard, apiFetchOneUser, apiGetCreditCard, apiRemoveCreditCard, apiUpdateUserProfile } from '../api/api';
import { formatCardNumber } from '../pages/reports/shared/helpers';

export const useUserProfile = () => {
    const { t } = useI18n();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ success: '', error: '' });
    const [profile, setProfile] = useState({ username: '', firstName: '', lastName: '', phoneNumber: '', address: '' });
    const [card, setCard] = useState({ number: '', expiration: '', cvv: '', holder: '', billing: '', hasCard: false });
    const [editingCard, setEditingCard] = useState(false);

    const saveCard = async () => {
        const [month, year] = card.expiration.split('/');
        const formattedDate = `${year}-${month}-01T00:00:00Z`;

        try {
            await apiCreateCreditCard({
                card_number: card.number,
                expiration_date: formattedDate,
                cvv: card.cvv,
                cardholder_name: card.holder,
                billing_address: card.billing
            });
            setEditingCard(false);
            await loadData(); // Recargamos para ver los cambios
            setStatus({ success: t('tarjeta-guardada'), error: '' });
        } catch (err) {
            console.log(err)
            setStatus({ error: t('error-guardar-tarjeta'), success: '' });
        }
    };

    const removeCard = async () => {
        try {
            await apiRemoveCreditCard();
            setCard({ number: '', expiration: '', cvv: '', holder: '', billing: '', hasCard: false });
            setStatus({ success: t('tarjeta-eliminada'), error: '' });
        } catch (err) {
            console.log(err)
            setStatus({ error: t('error-eliminar-tarjeta'), success: '' });
        }
    };

    const loadData = async () => {
        try {
            const userData = await apiFetchOneUser();
            setProfile({
                username: userData.username || '',
                firstName: userData.first_name || '',
                lastName: userData.last_name || '',
                phoneNumber: userData.phone_number || '',
                address: userData.address || '',
            });

            const creditCardData = await apiGetCreditCard();
            if (creditCardData) {
                const { m, y } = getFromDate(creditCardData.expiration_date);
                setCard({
                    hasCard: true,
                    holder: creditCardData.cardholder_name || '',
                    billing: creditCardData.billing_address || '',
                    number: formatCardNumber(creditCardData.card_number || ''),
                    expiration: `${m}/${y}`,
                    cvv: creditCardData.cvv || '',
                });
            }
        } catch (err) {
            console.log(err)
            setStatus({ error: t('error-cargar-perfil'), success: '' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const updateProfile = async (updatedData) => {
        try {
            await apiUpdateUserProfile(updatedData);
            setStatus({ success: t('perfil-actualizado'), error: '' });
        } catch (err) {
            console.log(err)
            setStatus({ error: t('error-actualizar-perfil'), success: '' });
        }
    };

    return { profile, setProfile, card, setCard, loading, status, setStatus, loadData, updateProfile, saveCard, removeCard, editingCard, setEditingCard };
};