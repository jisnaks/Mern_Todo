const express = require('express')

//Create an instance of our router
const router = express.Router();
const {getTodos,updateTodo,addTodo,deletedTodo} = require("../controllers/todoController")

//GET   
router.get("/",getTodos)
router.post("/",addTodo)
router.put("/:id",updateTodo)
router.delete("/:id",deletedTodo)



module.exports =  router;