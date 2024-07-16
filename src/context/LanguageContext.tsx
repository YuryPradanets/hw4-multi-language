import React, { createContext, useState, ReactNode, useContext } from 'react';
import en from '../i18n/en';
import ru from '../i18n/ru';
import fr from '../i18n/fr';

const languages = {
    en,
    ru,
    fr
};

type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    translations: { [key: string]: string };
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState('en');

    const value = {
        language,
        setLanguage,
        translations: languages[language as keyof typeof languages],
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
