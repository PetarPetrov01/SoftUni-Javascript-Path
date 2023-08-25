module.exports = () => {
    const users = {
        'peter': {
            username: 'Peter',
            hashedPassowrd: 'somePassword'
        }
    };

    return (req, res, next) => {
        req.auth = {
            register
        };
        async function register(username, password) {
            if (Object.values(users).find(u => u.username == username) != undefined) {
                //Already exists
                return false;
            } else {
                const hashedPassowrd = await bcrypt.hash(password, 10);
                const id = 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
                const user = {
                    id,
                    username,
                    hashedPassowrd
                };
                users[id] = user;

                return true;
            }
        }
        next();
    };
};