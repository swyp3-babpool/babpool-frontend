import { useNavigate } from "react-router-dom"

export const useNavigation = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return {navigate, goBack};
}