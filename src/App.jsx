// src/App.js
import { useState, useEffect } from 'react';
import SearchBar from './features/todos/SearchBar';
import TodoList from './features/todos/TodoList';
import DoneList from './features/todos/DoneList';
import AddTodo from './features/todos/AddTodo';
import { deleteAllTasks, getTasks, updateTask } from './services/apiTask';
import ConfirmationDialog from './ui/ConfirmationDialog';
import Loader from './ui/Loader';

function App() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doneTasks, setDoneTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTask, setDeleteTask] = useState(false);
  function fetchTodoTask(searchTerm) {
    getTasks(false, searchTerm).then((data) => {
      setTodoTasks(data);
    });
  }
  function fetchDoneTask(searchTerm) {
    getTasks(true, searchTerm).then((data) => {
      setDoneTasks(data);
    });
  }
  function sortTaskByText(tasks) {
    return tasks.sort((task1, task2) => task1.text.localeCompare(task2.text));
  }
  function updateTaskLocally(task) {
    //true it is changed from false to true
    if (task.isCompleted) {
      let newDoneTasks = [...doneTasks, task];
      newDoneTasks = sortTaskByText(newDoneTasks);
      setDoneTasks(newDoneTasks);
      //false it is changed from true to false
    } else {
      const newDoneTasks = doneTasks.filter((item) => item._id != task._id);
      newDoneTasks.sort((task1, task2) => task1.text.localeCompare(task2.text));
      setDoneTasks(sortTaskByText(newDoneTasks));
      let newTodoList = [...todoTasks, task];
      newTodoList = sortTaskByText(newTodoList);
      setTodoTasks(newTodoList);
    }
  }

  useEffect(() => {
    setLoading(true);
    try {
      fetchTodoTask(searchTerm);
      fetchDoneTask(searchTerm);
    } catch (e) {
      console.log('error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  async function handleToggle(taskId) {
    let beforeTask = todoTasks.find((item) => item.id === taskId) ?? [];
    if (beforeTask.length === 0)
      beforeTask = doneTasks.find((item) => item.id === taskId) ?? [];

    // Toggle the completion status of a task
    const task = {
      ...beforeTask,
      isCompleted: !beforeTask.isCompleted,
    };
    // Update the task's completion status on the backend
    try {
      updateTaskLocally(task);
      await updateTask(task._id, task);
      await Promise.all([fetchTodoTask(searchTerm), fetchDoneTask(searchTerm)]);
    } catch (e) {
      console.log('error', e);
      updateTaskLocally({ ...task, isCompleted: task.isCompleted });
    }
  }
  async function deleteAll() {
    try {
      await deleteAllTasks();
    } catch (e) {
      console.log('error', e);
    }

    setDeleteTask(false);
    setDoneTasks([]);
    setTodoTasks([]);
  }

  return (
    <div className="max-w-12xl container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="w-1/2 p-2">
          <h1 className="mb-2 text-2xl font-bold">Marvelous v2.0</h1>
        </div>
        <div className=" right-2 p-2">
          <button
            className="text-blue-600 underline"
            onClick={() => setDeleteTask(true)}
          >
            Delete all tasks
          </button>
          {deleteTask && (
            <ConfirmationDialog
              isOpen={deleteTask}
              message="Are you sure to delete all tasks"
              onCancel={() => setDeleteTask(false)}
              onConfirm={() => deleteAll()}
            />
          )}
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="w-1/2 p-2">
          <AddTodo fetchNewTask={fetchTodoTask} />
        </div>
        <div className="right-2 p-2 ">
          <SearchBar onSearch={setSearchTerm} />
        </div>
      </div>

      <div className="flex">
        <div className="relative w-1/2 p-2">
          {loading ? (
            <Loader />
          ) : (
            <TodoList tasks={todoTasks} onToggle={handleToggle} />
          )}
        </div>

        <div className="relative ml-8 w-1/2 p-2">
          <DoneList tasks={doneTasks} onToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
}

export default App;
