// Homework of 07-06-2023

const express = require('express')
const app = express();
app.use(express.json());

app.get('/add',(req,res)=>{
    let x = Number(req.query.num1);
    let y = Number(req.query.num2);
    if(isNaN(x) || isNaN(y)){
        res.send(`Envalid number`)
    }
    let sum = x + y;
    res.send(`The sum is ${sum}`);
})

app.post('/sub',(req,res)=>{
    let x = Number(req.body.num1);
    let y = Number(req.body.num2);
    let sub = x - y;
    res.send(`The sub is ${sub}`);
})

app.post("/mul", (req, res) => {
  let x = Number(req.body.num1);
  let y = Number(req.body.num2);
  let mul = x * y;
  res.send(`The mul is ${mul}`);
});

app.post("/divide", (req, res) => {
  let x = Number(req.body.num1);
  let y = Number(req.body.num2);
  let div = x / y;
  res.send(`The divide is ${div}`);
});

app.get("/addlist",(req,res)=>{
    let arr = req.query.num.split(',');
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += Number(arr[i]);
    }
    res.send(`The sum is ${sum}`);
})

app.get("/mullist", (req, res) => {
  let arr = req.query.num.split(",");
  let mul = 1;
  for (let i = 0; i < arr.length; i++) {
    mul *= Number(arr[i]);
  }
  res.send(`The Mul is ${mul}`);
});


// Homework of 08-06-2023
const TodoList = []

app.post('/addItem',(req,res)=>{
    const Id = req.body.Todo.Id;
    const todo = req.body.Todo.todo;
    const Todo = {
        Id : Id,
        todo : todo
    };
    for(let i = 0; i < TodoList.length; i++){
        if(Id == TodoList[i].Id){
            res.send("Same Id Todo exist alredy");
            return;
        }
    }
    TodoList.push(Todo);
    console.log(TodoList);
    res.send(`Todo Added`);
})

app.get('/getToDoList',(req,res)=>{
    console.log(TodoList);
    res.send(TodoList);
})

app.put('/updateitem', (req, res)=>{
    const Id = req.body.Todo.Id;
    const todo = req.body.Todo.todo;
    for (let i = 0; i < TodoList.length; i++) {
      if (Id == TodoList[i].Id) {
        TodoList[i].todo = todo;
        res.send("Todo Updated");
        return;
      }
    }
    res.send("Same Id are not exist")
})

app.delete('/deleteitem',(req,res)=>{
    const Id = req.body.Id;
    let idx = -1;
    for(let i = 0; i < TodoList.length; i++){
        if(Id == TodoList[i].Id){
            idx = i;
            break;
        }
    }
    if(idx == -1){
        res.send("Same Id are not exist");
        return;
    }
    for(let i = idx; i < TodoList.length; i++){
        TodoList[i] = TodoList[i+1];
    }
    TodoList.pop();
    res.send("Todo Deleted");
})


app.listen(3000,()=>{
    console.log("server is running");
})