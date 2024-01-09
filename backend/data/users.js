import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Arka Das',
        email: 'arka@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Sumita Das',
        email: 'sumita@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default user