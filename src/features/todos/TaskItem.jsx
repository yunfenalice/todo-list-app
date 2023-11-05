/* eslint-disable react/prop-types */
function TaskItem({ task, onToggle }) {
  return (
    <div className="mb-2 flex items-center">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        className="mr-2"
      />
      <p className={task.isCompleted ? 'line-through' : ''}>{task.text}</p>
    </div>
  );
}

export default TaskItem;
