import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { useTasks } from "../context/taskContext";
import { useRouter } from "next/router";

const TaskFormPage = () => {

    const [task, setTask] = useState({
        title: '',
        description: ''
    });
    const { createTask, updateTask, tasks } = useTasks();
    const { push, query } = useRouter();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!query.id){
            createTask(task.title, task.description);
            console.log('Creating')
        }else{
            updateTask(query.id, task)
            console.log('Updating')
        }
        push('/')
    }

    useEffect(() => {
        if(query.id){
            const taskFound = tasks.find(task => task.id === query.id);
            setTask({title: taskFound.title, description: taskFound.description})
        }
    }, [])

  return (
    <Layout>
        <form onSubmit={handleSubmit}>

            <h1 className="">{query.id ? 'Update Task' : 'Create a Task'}</h1>

            <input
            type="text"
            name="title"
            placeholder="Write a Title"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            onChange={handleChange}
            value={task.title}
            />

            <textarea
            name="description"
            rows="2"
            placeholder="Write a description"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            onChange={handleChange}
            value={task.description}
            ></textarea>

            <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30"
            disabled={!task.title}>
                Save
            </button>

        </form>
    </Layout>
  )
}

export default TaskFormPage