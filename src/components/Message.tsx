import { useLanguage } from '../context/LanguageContext';

type MessageProps = {
    id: string;
};

export const Message = ({ id }: MessageProps) => {
    const { translations } = useLanguage();
    return <>{translations[id] || id}</>;
};