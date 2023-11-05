/* eslint-disable no-unused-vars */
import TaskItem from './TaskItem';

/* eslint-disable react/prop-types */
function DoneList({ tasks, onToggle }) {
  //const recentCompletedTasks = tasks.slice(-10); // Display the last 10 completed tasks

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Done</h2>
      <hr className="my-4 border-t-2 border-gray-400" />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default DoneList;
