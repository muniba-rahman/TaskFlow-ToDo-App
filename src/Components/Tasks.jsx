import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Tasks = () => {

    const [task, setTask] = useState('');
    const [data, setData] = useState([]);

    useEffect(()=>{
        let nullData = JSON.parse(localStorage.getItem("data"));
        if(nullData){
            let data = JSON.parse(localStorage.getItem("data"));
            setData(data);
        }
    }, []);

    const toggleFinished =()=>{
        setShowFinished(!showFinished);
    }

    const saveToLocalStorage =()=>{
        localStorage.setItem("data", JSON.stringify(data));
    }

    const handleEdit =(e, id)=>{
        let newTask = data.filter((item)=> item.id === id);
        setTask(newTask[0].task);
        let newData = data.filter((item)=>{
            return item.id !== id;
        });
        setData(newData);
        saveToLocalStorage();
    };

    const handleDelete =(e, id)=>{
        // confirm("The task wil be deleted");
        let newData = data.filter((item)=>{
            return item.id !== id;
        });
        setData(newData);
        saveToLocalStorage();
    };

    const handleAdd =()=>{
        setData([...data, {id: uuidv4(), task, isCompleted: false}]);
        setTask('');
        saveToLocalStorage();
    };

    const handleChange =(e)=>{
        setTask(e.target.value);
    };

    const handleCheckbox=(e)=>{
        let id = e.target.name;
        let index = data.findIndex((item)=> item.id === id);
        let newData = [...data];
        newData[index].isCompleted = !newData[index].isCompleted;
        setData(newData);
        saveToLocalStorage();
    }
    
  return (
    <>
        <div className='container flex my-4 mx-auto w-3/4'>
        <input onChange={handleChange} value={task} type="text" placeholder='Add your tasks here...' className='p-2 text-lg bg-none border-2 border-purple-800 w-full' />
        <button disabled={task.length<=3} onClick={handleAdd} className='p-2 text-ld bg-purple-800 text-white'>Save</button>
        </div>

        <div className="container w-3/4 mx-auto my-10">
            <h1 className='text-3xl text-purple-700'>Your Pending Tasks</h1>
            {data.length == 0 && <div className='my-5'>No tasks to show</div>}
                {
                    data.map(item=>{
                        return( 
                                <div key={item.id} className="flex my-3 justify-between border-2 border-purple-700 rounded">
                                    <div className='flex m-2'>
                                    <input name={item.id} onChange={handleCheckbox} type="checkbox" className='text-lg' value={item.isCompleted}/>
                                    <p className={item.isCompleted ? "text-lg m-1 text line-through" : "text-lg m-1 text"}>{item.task}</p>
                                    </div> 
                                    <div>
                                        <button onClick={(e)=>{handleEdit(e, item.id)}} className='p-2 m-1 text-ld bg-purple-800 text-white'>Edit</button>
                                        <button onClick={(e)=>{handleDelete(e, item.id)}} className='p-2 m-1 text-ld bg-purple-800 text-white'>Delete</button>
                                    </div>
                                </div>
                        )
                    })
                }
        </div>
    </>
  )
}

export default Tasks;