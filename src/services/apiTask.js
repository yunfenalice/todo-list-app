const API_URL = 'https://todo-list-ji3s.onrender.com/api/v1/tasks';

export async function getTasks(isCompleted, searchItem) {
  let api = `${API_URL}?isCompleted=${isCompleted}`;
  if (isCompleted) {
    api += `&limit=10&sort=-lastModifiedDate`;
  } else {
    api += `&sort=text`;
  }

  if (searchItem.trim()) {
    api += `&text=${searchItem}`;
  }
  const res = await fetch(api);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();

  return data?.tasks ?? [];
}
export async function deleteAllTasks() {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw Error();
  } catch {
    throw Error('Failed delete your task');
  }
}

export async function createTask(newTask) {
  const task = {
    text: newTask,
  };

  try {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your task');
  }
}

export async function updateTask(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your task');
  }
}
