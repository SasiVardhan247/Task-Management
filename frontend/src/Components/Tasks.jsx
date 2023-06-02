import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const handlestatus = (task)=>{
    
    // console.log(task._id);
    const config = { url: `/task/${task._id}`, method: "put", data: {
      ...task, status:!task.status
    }};
      fetchData(config).then((data) => {
      // console.log("Status Set to :",!task.status);
      // console.log(data);
        fetchTasks();
      });

  }

  const fetchTasks = useCallback(() => {
    const config = { url: '/task/', method: "get"};
    fetchData(config, { showSuccessToast: false }).then(data => {setTasks(data);
    // console.log(data);
    })
    .catch(error => {
      // Handle the error here, e.g., log the error or display an error message
      console.error('Error fetching tasks:', error);
    });
  }, [fetchData]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/task/${id}`, method: "delete"};
    fetchData(config).then(() => fetchTasks()).catch(error => {
      // Handle the error here, e.g., log the error or display an error message
      console.error('Error fetching tasks:', error);
    });
  }


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks && tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks && tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/task/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : ( tasks &&
              tasks.map((task) => (
                <div key={task._id} className='bg-red-50 my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex'>

                    <span className='font-bold text-2xl'>{task.name}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link to={`/task/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>
                  <div className='flex justify-between'>
                  <div className='whitespace-pre'>{task.description}</div>
                  <div>
                     
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" onChange={()=>{handlestatus(task)}} checked={task.status} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      {task.status && <span className="ml-3 text-base font-bold text-green-900 dark:text-green-300">Completed</span> }
                      {!task.status && <span className="ml-3 text-base font-bold text-red-900 dark:text-red-300">Incomplete</span> }
                    </label>

                    </div>
                    </div>
                </div>
              ))

            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks