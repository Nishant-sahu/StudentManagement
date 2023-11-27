const fs = require('fs');
const path = require('path');
const { hashPassword, comparePassword } = require('../utils/passwordUtil');
const studentsFilePath = path.join(__dirname, '../../data/students.json');

const getAllStudents = () => {
    const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
    return students;
};

const getStudentById = (id) => {
    const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
    return students.find((s) => s.id === id);
};

const createStudent = (studentData) => {
    const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
    const newStudent = {
        id: students.length + 1,
        ...studentData,
        password: hashPassword(studentData.password),
    };
    students.push(newStudent);
    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
    return newStudent;
};

const updateStudent = (id, updatedData) => {
    const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
    const index = students.findIndex((s) => s.id === id);

    if (index !== -1) {
        const updatedStudent = { ...students[index], ...updatedData };
        students[index] = updatedStudent;
        fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
        return updatedStudent;
    } else {
        return null;
    }
};

const deleteStudent = (id) => {
    let students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
    students = students.filter((s) => s.id !== id);
    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
