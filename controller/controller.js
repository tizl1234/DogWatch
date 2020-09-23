	const db = require('../config/db.config.js');
	const config = require('../config/config.js');
	const User = db.user;
	const Role = db.role;

	const Op = db.Sequelize.Op;

	var jwt = require('jsonwebtoken');
	var bcrypt = require('bcryptjs');

	exports.signin = (req, res) => {
	    User.findOne({
	        where: {
	            username: req.body.username
	        }
	    }).then(user => {
	        if (!user) {
	            return res.status(404).send('User Not Found.');
	        }

	        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

	        if (!passwordIsValid) {
	            return res.status(401).send({
	                auth: false,
	                accessToken: null,
	                reason: "Invalid Password!"
	            });
	        }

	        let token = jwt.sign({
	            id: user.id
	        }, config.secret, {
	            expiresIn: 86400 // expires in 24 hours
	        });

	        res.status(200).send({
	            auth: true,
	            accessToken: token
	        });
	    }).catch(err => {
	        res.status(500).send('Error -> ' + err);
	    });
    }
    
    exports.userContent = (req, res) => {
        User.findOne({
          where: {id: req.userId},
          attributes: ['name', 'username', 'email'],
          include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
              attributes: ['userId', 'roleId'],
            }
          }]
        }).then(user => {
          res.status(200).json({
            "description": "User Content Page",
            "user": user
          });
        }).catch(err => {
          res.status(500).json({
            "description": "Can not access User Page",
            "error": err
          });
        })
      }

      exports.adminBoard = (req, res) => {
        User.findOne({
          where: {id: req.userId},
          attributes: ['name', 'username', 'email'],
          include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
              attributes: ['userId', 'roleId'],
            }
          }]
        }).then(user => {
          res.status(200).json({
            "description": "Admin Board",
            "user": user
          });
        }).catch(err => {
          res.status(500).json({
            "description": "Can not access Admin Board",
            "error": err
          });
        })
      }