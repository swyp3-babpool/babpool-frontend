import { loginCheck } from "@/utils/validate";
import { useNavigate } from "react-router-dom"

export const useNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(url);
    }

    const goBack = () => {
        navigate(-1);
    }

    const goHome = () => {
        navigate('/');
    }

    const loginCheckNavigate = (url: string) => {
        if(loginCheck()) {
            navigate(url);
        } else {
            navigate('/signin');
        }
    }

    const authCheck = () => {
        if(!loginCheck()) {
            navigate('/signin');
            return false
        }
        return true
    }

    return {navigate, handleNavigate, authCheck, loginCheckNavigate, goHome, goBack};
}