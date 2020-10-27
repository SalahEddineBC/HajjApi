const jwt = require('jwt-then');

const { User } = require('../models');

const login = async (req, res) => {
    const { email, } = req.body;
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        const token = await jwt.sign(
            { email, id: user.id },
            config.jwtSecret,
            {
                expiresIn: config.jwtExpiration
            }
        );
        res.status(200).send({
            success: true,
            message: 'Token generated Successfully',
            Id: user.id,
            token,
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: err
        });
    }
};

export { login };