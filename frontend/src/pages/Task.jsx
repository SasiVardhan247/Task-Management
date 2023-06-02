import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Input,Textarea } from '../Components/utils/Input';
import Loader from '../Components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../Layouts/MainLayout';

const Task = () => {

  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    name:"",
    description: ""
  });

  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);


  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/task/${taskId}`, method: "get"};
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ name: data.task.name ,description: data.task.description });
      })
      .catch(error => {
        // Handle the error here, e.g., log the error or display an error message
        console.error('Error fetching tasks:', error);
      });
    }
  }, [mode, taskId, fetchData]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      name : task.name,  
      description: task.description
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === "add") {
      const config = { url: "/task", method: "post", data: formData};
      fetchData(config).then(() => {
        navigate("/");
      });
    }
    else {
      const config = { url: `/task/${taskId}`, method: "put", data: formData};
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }

  return (
    <>
      <MainLayout>
        <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>
          {loading ? (
            <Loader />
          ) : (
            <>
            <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>

            <div className="mb-4">
                <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
                <Input type="text" name="name" id="name" value={formData.name} placeholder="Task name.." onChange={handleChange} />
            </div>

            <div className="mb-4">
                <label htmlFor="description">Description</label>
                <Textarea type="description" name="description" id="description" value={formData.description} placeholder="Write here.." onChange={handleChange} />
            </div>

              <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>{mode === "add" ? "Add task" : "Update Task"}</button>
              <button className='ml-4 bg-red-500 text-white px-4 py-2 font-medium' onClick={() => navigate("/")}>Cancel</button>
              {mode === "update" && <button className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600' onClick={handleReset}>Reset</button>}
            </>
          )}
        </form>
      </MainLayout>
    </>
  )
}

export default Task