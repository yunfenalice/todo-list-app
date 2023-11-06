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
  const [todoLoading, setTodoLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [doneTasks, setDoneTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTask, setDeleteTask] = useState(false);
  function fetchTodoTask(searchTerm) {
    setTodoLoading(true);
    getTasks(false, searchTerm).then((data) => {
      setTodoLoading(false);
      setTodoTasks(data);
    });
  }
  function fetchDoneTask(searchTerm) {
    setDoneLoading(true);
    getTasks(true, searchTerm).then((data) => {
      setDoneLoading(false);
      setDoneTasks(data);
    });
  }
  function sortTaskByText(tasks) {
    tasks.sort((task1, task2) => task1.text.localeCompare(task2.text));
  }
  function updateTaskLocally(task) {
    //true it is changed from false to true
    if (task.isCompleted) {
      setDoneTasks((prev) => prev.push(task));
      //false it is changed from true to false
    } else {
      const doneTasks = doneTasks.filter(prev.id != task.id);
      setDoneTasks(sortTaskByText(doneTasks));
      const todoTasks = todoTasks.push(task);
      setTodoTasks(sortTaskByText(todoTasks));
    }
  }

  function revertUpdateLocally(task) {
    if (task.isCompleted) {
      // If the task was marked as completed (true), revert it to not completed (false)
      setDoneTasks((prevDoneTasks) => {
        const updatedDoneTasks = prevDoneTasks.filter(
          (doneTask) => doneTask.id !== task.id,
        );
        setTodoTasks((prevTodoTasks) => [...prevTodoTasks, task]);
        return sortTaskByText(updatedDoneTasks);
      });
    } else {
      // If the task was not completed (false), revert it to completed (true)
      setTodoTasks((prevTodoTasks) => {
        const updatedTodoTasks = prevTodoTasks.filter(
          (todoTask) => todoTask.id !== task.id,
        );
        setDoneTasks((prevDoneTasks) => [...prevDoneTasks, task]);
        return sortTaskByText(updatedTodoTasks);
      });
    }
  }
  useEffect(() => {
    fetchTodoTask(searchTerm);
    fetchDoneTask(searchTerm);
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
      revertUpdateLocally(task);
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
        <div className="w-1/2 p-2">
          {todoLoading ? (
            <Loader />
          ) : (
            <TodoList tasks={todoTasks} onToggle={handleToggle} />
          )}
        </div>

        <div className="ml-8 w-1/2 p-2">
          {doneLoading ? (
            <Loader />
          ) : (
            <DoneList tasks={doneTasks} onToggle={handleToggle} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
