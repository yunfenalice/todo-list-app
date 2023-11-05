# React + Vite

frontend hosted in netlify
url:https://friendly-platypus-3d2e4e.netlify.app/
backend host in render
database: MongoDB, online database

# 1. Enhance Todo List Functionality

### 1.1 Add Scrollable Functionality to Todo List

Implement scrollable functionality for the todo list, ensuring it remains manageable even when the list is unlimited.
Use a container with a fixed height and overflow-auto to make the list scrollable when it exceeds the container's dimensions.
Apply Tailwind CSS classes for styling as described earlier.

### 1.2 Implement Request Handling for Adding Todos

Disable the "Add" button temporarily when adding a new todo to prevent concurrent requests.
Steps:
Disable the "Add" button when the user initiates the request.
Enable the button once the previous request has been completed, which can be determined by tracking loading status

# 2. Database Update

### 2.1 Add lastModifiedDate to the Database

Add a lastModifiedDate field to the database to assist in filtering the completed tasks based on their completion date. Add lastModifiedDate field in Schema, which should store the timestamp of the most recent modification.

# 3. add loader

I add a loader component when we fetch data from backend.
