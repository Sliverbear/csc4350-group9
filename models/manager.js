var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://Group9:Akshita1234@aagn29ugs86czq.c31f2v7z8hc6.us-west-2.rds.amazonaws.com:5432/postgres');

// setup User model and its fields.
var Manager = sequelize.define('manager', {
    firstName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (manager) => {
        const salt = bcrypt.genSaltSync();
        manager.password = bcrypt.hashSync(manager.password, salt);
      }
    }
    // instanceMethods: {
    //   validPassword: function(password) {
    //     return bcrypt.compareSync(password, this.password);
    //   }
    // }    
});

// Instance Method
Manager.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
      }

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('managers table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export Manager model for use in other files.
module.exports = Manager;