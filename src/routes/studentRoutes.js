const express = require('express');
const router = express.Router();
const { csrfProtection } = require('../middleware/csrfMiddleware');
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
 

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/' , csrfProtection , createStudent);
router.put('/:id', csrfProtection , updateStudent);
router.delete('/:id', csrfProtection , deleteStudent);

module.exports = router;
