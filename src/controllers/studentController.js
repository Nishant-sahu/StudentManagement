const fs = require('fs');
const path = require('path');
const {hashPassword} = require('../utils/passwordUtil');

const studentsFilePath = path.join(__dirname, '../../data/students.json');

const getAllStudents = (req, res) => {
    try {
        const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
        students.forEach((student) => {
            delete student.password;
        });
        res.json({
            message: 'All students retrieved',
            data: students,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStudentById = (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
        const student = students.find((s) => s.id === studentId);

        if (student) {
            delete student.password;
            res.json({
                message: 'Student found',
                data: student,
            });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStudentByAdmissionNumberAndPassword = (admissionNumber, password) => {
    try {
        const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
        return students.find((s) => s.admissionNumber === admissionNumber);
    } catch (error) {
        return null;
    }
};

const createStudent = async (req, res) => {
    try {
        const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
        const newStudent = {
            id: students.length + 1,
            ...req.body,
        };
        newStudent.password = await hashPassword(newStudent.password);
        students.push(newStudent);
        fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
        res.status(201).json({
            message: 'Student created successfully',
            data: newStudent,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateStudent = (req, res) => {
    try {
        const admissionNumber = req.params.id;
        const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
        const index = students.findIndex((s) => s.admissionNumber === admissionNumber);

        if (index !== -1) {
            const updatedStudent = { ...students[index], ...req.body };
            students[index] = updatedStudent;
            fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
            res.json({
                message: 'Student updated successfully',
                data: updatedStudent,
            });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteStudent = (req, res) => {
    try {
        const admissionNumber = req.params.id;
        let students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
        students = students.filter((s) => s.admissionNumber !== admissionNumber);
        fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByAdmissionNumberAndPassword,
};
