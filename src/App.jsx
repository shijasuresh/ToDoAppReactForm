import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import TaskCard from './components/TaskCard';
import Loader from './components/Loader';
const firebaseUrl = 'https://frontend-cohort-db125-default-rtdb.asia-southeast1.firebasedatabase.app/';

function App() {
  // let {register, handleSubmit, reset} = useForm();
  let taskInput = useRef(null);
  let [todos, setTodos] = useState([]);
  let [formStatus, setFormStatus] = useState(false);
  
  // function addTaskHandler(data) {
  //   setTasks([...tasks, data])
  //   reset();
  // }

  function handleSubmit() {
    setFormStatus(true);
    let task = taskInput.current.value;
    axios.post(`${firebaseUrl}todos.json`, {
      title: task
    }).then(()=> {
      setFormStatus(false);
      fetchTodos();
    })
  }

  function fetchTodos() {
    axios.get(`${firebaseUrl}todos.json`).then(todos=>{
      let tempTodos = [];
      for(let key in todos.data) {
        let todo= {
          id: key,
          ...todos.data[key]
        }
        tempTodos.push(todo);
      }
      setTodos(tempTodos);
    })
  }

  function handleDelete(id) {
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{
      fetchTodos();
    })
  }

  useEffect(()=>{
    fetchTodos()
  }, [])


  return (
    <div>
      <div className="bg-blue-600 text-white text-center py-3 font-light">If you've got tasks, start managing today!</div>

      <div className="w-[360px] mx-auto mt-16">
          <h1 className="text-xl text-black font-bold">Manage your task <span className="text-neutral-500">@Shija</span></h1> 
          <p className="text-neutral-600">Add your tasks and start organizing them quickly.</p>
      </div>

      {/* <form action="" className='w-[360px] mx-auto mt-5' onSubmit={handleSubmit(addTaskHandler)}> */}
      <div className='w-[360px] mx-auto mt-5'>
        <div className="flex gap-2">
            <input ref={taskInput} className="w-[87%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600" type="text" placeholder="e.g. Learn Javascript" />
            {/* <input {...register('task')} className="w-[87%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600" type="text" placeholder="e.g. Learn Javascript" /> */}
            {/* <input {...register('dueDate')} className="w-[13%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600" type="datetime-local" placeholder="e.g. Learn Javascript" /> */}
        </div>
        <button onClick={handleSubmit} className="mt-2 bg-violet-200 py-3 px-5 text-violet-900 rounded-xl flex align-center gap-4">Create Todos{!formStatus ? "" : <Loader /> }</button>
        </div>
        {/* <input type="submit" value="Add Task" className="bg-black rounded-lg text-white px-5 py-3 text-sm font-light" /> */}
      {/* </form> */}

      <div className="w-[360px] mx-auto mt-5">
        {
          // tasks.length > 0 ? tasks.map((task,index)=> <TaskCard key={index} title={task.task} date={task.dueDate} />) : <h1 className='text-center mt-5'>No Tasks</h1>
          todos.length > 0 ? todos.map(todo=> <TaskCard handleDelete={handleDelete} id={todo.id} title={todo.title} key={todo.id} />) : <h1 className='text-center mt-5'>No Tasks</h1>
        }
     </div>      

    </div>
  )
}

export default App
