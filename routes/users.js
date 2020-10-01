/*eslint-env es6*/
const router = require('express').Router();
const {getUsers, getUserById, createUser, updateUser, updateAvatar} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/avatar', updateAvatar);

module.exports = router;
