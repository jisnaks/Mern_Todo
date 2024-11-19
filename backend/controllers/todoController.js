const Todo =  require("../models/Todo")

//get all todos
const getTodos = async (req,res) =>{
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch(err){
        res.status(500).json({error : err.message})
    }
}

const addTodo = async (req, res) => {
    try {
      const { text, completed } = req.body; // Ensure you're destructuring correctly
      const newTodo = new Todo({
        text,
        completed: completed || false, // default to false
      });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({ error: err.message }); // Make sure `res` is the Express response object
    }
  };
  

  const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { text, completed } = req.body;
  
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { text, completed },
        { new: true } // Return the updated document
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };  

  const deletedTodo = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTodo = await Todo.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
  
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {getTodos,updateTodo,addTodo,deletedTodo}