/************************************/
/*** Import des modules nécessaires */
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const reviewModel = require('../models/reviewModel');

const { setUsers, setRoles, setReviews } = require('../db/setDataSample')
const { Sequelize, DataTypes } = require('sequelize');

/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize(
    'mondededouceur',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        logging: false
    }
)

/*********************************/
/*** Synchronisation des modèles */
const User = UserModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const Review = reviewModel(sequelize, DataTypes)



Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Review)
Review.belongsTo(User)

// User.hasOne(Profil)
// Profil.belongsTo(User)

// Profil.hasMany(Review)
// Review.belongsTo(Profil)


sequelize.sync({ force: true })
    .then( async() => {
        await setRoles(Role)
        await setUsers(User)
        // await setProfils(Profil)
        await setReviews(Review)
    
        
        
    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

    module.exports = {  User, Role, Review, sequelize }