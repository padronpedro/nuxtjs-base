const models = require('../models');
const config = require("../config/auth.config");
const User = models.User;
const Role = models.Role;

const Op = models.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(foundUser => {
      if (!foundUser) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!foundUser.is_active) {
        return res.status(401).send({ message: "User inactive" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }

      var accessToken = jwt.sign({ id: foundUser.id }, config.secret, {
        // expiresIn: '10s' // 10s
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        'token': {
          accessToken,
        }
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getUser = (req, res) => {
  try{
    let result = {
      id: '',
      name: '',
      email: '',
      roles: '',
      permissions: ''
    }

    User.findByPk(req.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        if (!user.is_active) {
          return res.status(401).send({ message: "User inactive" });
        }

        var authorities = [];
        var permissionList = [];

        user.getRoles()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].name.toUpperCase());
          }
        })
        .then(() => {
          user.getPermissions()
          .then(permission => {
            for (let i = 0; i < permission.length; i++) {
              permissionList.push(permission[i].name.toUpperCase());
            }
            result.id = user.id
            result.name = user.name
            result.email = user.email
            result.roles = authorities
            result.permissions = permissionList

            res.status(200).send(result);
          })
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message,
          origin: 'getUser'
        });
      });
  }catch(err) {
    res.status(400).send({});
  }
}
