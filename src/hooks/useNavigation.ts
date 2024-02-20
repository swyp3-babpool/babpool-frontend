import { useNavigate } from "react-router-dom"

export const useNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(url);
    }

    const goBack = () => {
        navigate(-1);
    }

    return {navigate, handleNavigate, goBack};
}