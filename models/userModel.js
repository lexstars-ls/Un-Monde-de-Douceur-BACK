// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le mail est déjà pris."
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom d'utilisateur est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 8 et 40.",
                    args: [4, 15]
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        onDelete: 'CASCADE',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    }
    );
}