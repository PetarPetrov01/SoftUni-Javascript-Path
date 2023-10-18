export const setUserStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    try {
        const result = user ? JSON.parse(user) : null;
        return result;
    } catch (error) {
        alert('Error from storage');
    }
};

export const deleteUser = () => {
    localStorage.clear();
};