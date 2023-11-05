/* eslint-disable react/prop-types */
import { useState } from 'react';
import { createTask } from '../../services/apiTask';

function AddTodo({ fetchNewTask }) {
  const [newTaskText, setNewTaskText] = useState('');
  const [submitting, setSubmittinig] = useState(false);
  async function handleAddTask() {
    if (newTaskText.trim() === '') {
      return; // Prevent adding empty tasks
    }
    setSubmittinig(true);
    try {
      await createTask(newTaskText);
    } catch (e) {
      console.log('error', e);
    } finally {
      setSubmittinig(false);
    }

    fetchNewTask();
    setNewTaskText('');
  }

  return (
    <div className="justify-left mb-1 flex items-center ">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        className="input"
      />
      <button
        onClick={handleAddTask}
        disabled={submitting}
        className=" ml-3 w-20  rounded-md bg-blue-200 p-2 text-black"
      >
        {submitting ? 'Submitting' : 'Add'}
      </button>
    </div>
  );
}

export default AddTodo;
