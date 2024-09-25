import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TaskCard from './TaskCard';

function App() {
  let {register, handleSubmit, reset} = useForm();
  let [tasks, setTasks] = useState([]);
  
  function addTaskHandler(data) {
    setTasks([...tasks, data])
    console.log(tasks)

    reset();
  }

  return (
    <div>
      <div className="bg-blue-600 text-white text-center py-3 font-light">If you've got tasks, start managing today!</div>

      <div className="w-[360px] mx-auto mt-16">
          <h1 className="text-xl text-black font-bold">Manage your task <span className="text-neutral-500">@Shija</span></h1> 
          <p className="text-neutral-600">Add your tasks and start organizing them quickly.</p>
      </div>

      <form action="" className='w-[360px] mx-auto mt-5' onSubmit={handleSubmit(addTaskHandler)}>
        <div className="flex gap-2">
            <input {...register('task')} className="w-[87%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600" type="text" placeholder="e.g. Learn Javascript" />
            <input {...register('dueDate')} className="w-[13%] p-3 rounded-lg border mb-2 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600" type="datetime-local" placeholder="e.g. Learn Javascript" />
        </div>
        <input type="submit" value="Add Task" className="bg-black rounded-lg text-white px-5 py-3 text-sm font-light" />
      </form>

      <div className="w-[360px] mx-auto mt-5">
        {
          tasks.length > 0 ? tasks.map((task,index)=> <TaskCard key={index} title={task.task} date={task.dueDate} />) : <h1 className='text-center mt-5'>No Tasks</h1>
        }
     </div>      

    </div>
  )
}

export default App
