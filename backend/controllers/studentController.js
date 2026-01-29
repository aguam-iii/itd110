const Student = require('../models/Student');

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single student
const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create student
const createStudent = async (req, res) => {
    try {
        const { name, email, course, allowance, expenditure } = req.body;
        const student = await Student.create({ name, email, course, allowance, expenditure });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const { name, email, course, allowance, expenditure } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, course, allowance, expenditure },
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};