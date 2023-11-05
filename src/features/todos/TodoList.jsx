/* eslint-disable no-unused-vars */
import TaskItem from './TaskItem';

/* eslint-disable react/prop-types */
function TodoList({ tasks, onToggle }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">To Do</h2>
      <hr className="my-4 border-t-2 border-gray-400" />
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
