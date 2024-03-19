module.exports = (sequelize, DataTypes) => {
    
    return sequelize.define('Review', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
      
    })
}