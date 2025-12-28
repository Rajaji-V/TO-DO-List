# ToDo List

A modern, feature-rich ToDo List web application with user authentication, advanced task management, and a sleek UI.

## Features

- **User Authentication**: Secure login and registration system using localStorage.
- **Task Management**:
  - Add tasks with priority (Low, Medium, High), category (Work, Personal, Health, Other), and due date.
  - Inline editing: Click on task text to edit directly.
  - Mark tasks as completed with visual feedback.
  - Delete tasks.
- **Advanced Filtering & Sorting**:
  - Search tasks by text.
  - Sort by priority, due date, or alphabetical order.
- **Statistics Dashboard**: View total, completed, and pending tasks.
- **Dark Mode Toggle**: Switch between light and dark themes.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Organized Structure**: Clean folder organization for maintainability.

## Technologies Used

- **HTML5**: Structure and content.
- **CSS3**: Styling with animations and responsive design.
- **JavaScript (ES6+)**: Logic, DOM manipulation, and localStorage for data persistence.
- **Git**: Version control.

## Project Structure

```
ToDoList/
├── index.html          # Login page
├── css/
│   └── style.css       # Stylesheets
├── js/
│   └── script.js       # JavaScript logic
├── pages/
│   ├── dashboard.html  # Main dashboard
│   └── index.html      # Redirect page
└── README.md           # This file
```

## Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rajaji-V/TO-DO-List.git
   cd TO-DO-List
   ```

2. **Run the Application**:
   - Start a local server (Python example):
     ```bash
     python -m http.server 8000
     ```
   - Open your browser and go to `http://localhost:8000`.

3. **No Dependencies**: This is a vanilla web app with no external libraries required.

## Usage

1. **Register/Login**: Create an account or log in with existing credentials.
2. **Add Tasks**: Use the input fields to add tasks with details.
3. **Manage Tasks**: Edit, complete, or delete tasks as needed.
4. **Filter & Sort**: Use the search bar and sort dropdown for organization.
5. **Toggle Theme**: Click the moon/sun icon to switch themes.
6. **Logout**: Securely log out when done.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the project.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add feature'`.
4. Push to branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Rajaji V** - [GitHub](https://github.com/Rajaji-V)
