const mockUsers = require('./mock-users')
const bcrypt = require('bcrypt')

const setUsers = (User) => {
    return Promise.all(mockUsers.map(user => {
        return bcrypt.hash(user.password, 10)
            .then(hashResult => {
                return User.create({ ...user, password: hashResult })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    }))
}

const setRoles = (Role) => {
    return Promise.all([
        Role.create({ id: 1, label: "superadmin" }),
        Role.create({ id: 2, label: "admin" }),
        Role.create({ id: 3, label: "edit" })
    ])
}


const setReviews = (Review) => {
    return Promise.all([
        Review.create({ content: "Super expérience pour ce bain des merveilles", UserId: 1 }),
        Review.create({ content: "Super expérience pour ce bain des merveilles", UserId: 2 }),
        Review.create({ content: "Super expérience pour ce bain des merveilles", UserId: 3 }),
        Review.create({ content: "Super expérience pour ce bain des merveilles", UserId: 4 })
    ])
}


module.exports = { setUsers, setRoles, setReviews}