//GET ALL STUDENT LIST

const db = require("../config/db");

const getStudents = async (req,res) =>{
    try {
        const data = await db.query('SELECT * FROM students')
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No record found'
            })
        }
        res.status(200).send({
            success:true,
            message:'All students records',
            totalStudents: data[0].length,
            data: data[0],
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in get all student',
            error
        })
        
    }
}

//GET STUDENT BY ID

const getStudentById = async (req,res) =>{
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid or provide student id'
            })
        }
       
        const data = await db.query(`SELECT * FROM students WHERE id=?`,[studentId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Not record found'
            })
        }
        res.status(200).send({
            success:true,
            studentDetails:data[0]
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get student by id',
            error
        })
        
    }

};

//CREATE STUDENT 

const createStudent = async (req,res) =>{
    try {
        const {name, roll_no, feels, classe, medium} = req.body
        if(!name || !roll_no || !feels || !classe || !medium){
            return res.status(500).send({
                success:false,
                message:'Please provide all field'
            })
        }

        const data = await db.query(`INSERT INTO students (name, roll_no, feels, classe, medium) VALUES (?, ?, ?, ?, ?)`,[name, roll_no, feels, classe, medium])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Error in insert query'
            })
        }

        res.status(201).send({
            success:true,
            message:'New student created'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create student',
            error

        })
        
    }

};

//UPDATE STUDENT

const updateStudent = async (req,res) =>{
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid id or provide id'
            })
        }
        const {name, roll_no, feels, classe, medium} = req.body
        const data = await db.query(`UPDATE students SET name=?, roll_no=?, feels=?, classe=?, medium=? WHERE id=?`,[name, roll_no, feels, classe, medium,studentId])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in update data'
            })
        }
        res.status(200).send({
            success:true,
            message:'Message update success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update Student',
            error
        })
    }
};

//DELETE STUDENT

const deleteStudent = async (req,res) =>{
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid id or provide id'
            })
        }
        await db.query(`DELETE FROM students WHERE id=?`,[studentId])
        res.status(200).send({
            success:true,
            message:'Delete student successfully'
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete Student',
            error
        })
        
    }
};


module.exports = { getStudents, getStudentById,createStudent,updateStudent,deleteStudent};