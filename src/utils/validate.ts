export const loginCheck = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return false;
    }
    return true;
}