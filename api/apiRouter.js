  
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const restricted = require('../middleware/restricted.js');
const { jwtSecret } = require('../api/config/secrets.js');

const api = require('./apiModel.js');

router.get('/users', restricted, (req, res) => {
    api.findByUsername(req.username)
        .then(user => {
            api.findDepartmentUsers(user.department)
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({ error: "Couldn't get department users." });
                })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });
})

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    api.add(user)
        .then(() => {
            const token = signToken(user)
            return res.status(201).json({message: `User: ${user.username} logged in.`, token: token});
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    api.findBy({ username }).first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user);
                return res.status(201).json({message: `User: ${user.username} logged in.`, token: token});
            } else {
                return res.status(401).json({ error: "Invalid credentials." })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong logging in user." });
        });
})



function signToken(user) {
    const payload = {
      userId: user.id,
      username: user.username
    }
  
    const options = {
      expiresIn: '1d'
    }
  
    return jwt.sign(payload, jwtSecret, options);
}

  module.exports = router;