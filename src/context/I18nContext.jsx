import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
	const { i18n, t } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

	useEffect(() => {
		// Update state when language changes
		const handleLanguageChange = (lng) => {
			setCurrentLanguage(lng);
		};

		i18n.on('languageChanged', handleLanguageChange);

		return () => {
			i18n.off('languageChanged', handleLanguageChange);
		};
	}, [i18n]);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	const value = {
		i18n,
		t,
		currentLanguage,
		changeLanguage,
		availableLanguages: ['es', 'en'],
	};

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

I18nProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useI18n = () => {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error('useI18n must be used within an I18nProvider');
	}
	return context;
};

