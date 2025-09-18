# ToDo Web Application
This is a web application for managing daily tasks, developed as a student project.
It allows users to create, view, complete, and delete tasks directly in the browser.

## Features
- Add new tasks using the input field or the "add" button.
- Mark tasks as completed with checkboxes (completed tasks are crossed out and faded).
- Delete tasks individually with a delete button.
- Tasks are saved in a local JSON file to persist between page reloads.
- Responsive design: adapts to desktop, tablet, and mobile screen sizes.

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express.js
- Data Storage: local JSON file
- Communication: Fetch API for front-end and back-end interaction

## How to Run Locally
1. Clone this repository:  
   `git clone <your-repository-url>`
2. Navigate to the backend folder:  
   `cd backend`
3. Install dependencies:  
   `npm install`
4. Start the backend server:  
   `node index.js`
5. Open `index.html` in your browser.
6. You can now add, complete, and delete tasks.

## Notes
- The `tasks.json` file is initially empty (`[]`) and automatically fills as tasks are added.

