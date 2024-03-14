import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(url, { replace: true });
    };

    const goBack = () => {
        navigate(-1);
    };

    const goHome = () => {
        navigate('/');
    };

    return { navigate, handleNavigate, goHome, goBack };
};
