import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams, useNavigate } from 'react-router-dom';
import {Header} from './components/Header';
import {Paragraph} from './components/Paragraph';
import {Message} from './components/Message';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Button } from './components/Button';

const LanguageSelector = () => {
    const { setLanguage } = useLanguage();
    const navigate = useNavigate();
    const { lang } = useParams();
    const [selectedLang, setSelectedLang] = useState(lang || 'en');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLang(event.target.value);
    };

    const handleButtonClick = () => {
        setLanguage(selectedLang);
        navigate(`/${selectedLang}/home`);
    };

    return (
        <div>
            <select value={selectedLang} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="fr">Français</option>
            </select>
            <button onClick={handleButtonClick}><Message id="button.do-translate" /></button>
        </div>
    );
};

const HomePage = () => (
    <div>
        <Header />
        <Paragraph id="paragraph1" />
        <Paragraph id="paragraph2" />
        <Paragraph id="paragraph3" />
        <LanguageSelector />
        <Button id=''/>
    </div>
);

const LanguageHandler = ({ children }: { children: React.ReactNode }) => {
    const { lang } = useParams();
    const { setLanguage } = useLanguage();

    React.useEffect(() => {
        if (lang) {
            setLanguage(lang);
        }
    }, [lang, setLanguage]);

    return <>{children}</>;
};

const App = () => {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/en/home" />} />
                    <Route path="/home" element={<Navigate to="/en/home" />} />
                    <Route path="/:lang/home" element={<LanguageHandler><HomePage /></LanguageHandler>} />
                    <Route path="*" element={<Navigate to="/en/home" />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
};

export default App;
