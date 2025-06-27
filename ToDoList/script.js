let users=JSON.parse(localStorage.getItem("users")) || {};

function login() {
  const u=document.getElementById("username").value.trim();
  const p=document.getElementById("password").value.trim();
  if (users[u]&&users[u].password===p) {
    localStorage.setItem("currentUser", u);
    window.location.href="dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}

function register() {
  const u=document.getElementById("username").value.trim();
  const p=document.getElementById("password").value.trim();
  if (!u||!p) return alert("Fill in both fields!");
  if (users[u]) return alert("User already exists.");
  users[u]={ password: p, tasks: [] };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered! You can login now.");
}

if (window.location.pathname.includes("dashboard.html")) {
  const currentUser=localStorage.getItem("currentUser");
  if (!currentUser||!users[currentUser]) 
    location.href="index.html";

  document.getElementById("userGreeting").innerText=`👋 Hello, ${currentUser}`;
  const taskList=document.getElementById("taskList");

  function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function renderTasks() {
    taskList.innerHTML="";
    const tasks=users[currentUser].tasks;

    tasks.forEach((task, i) => {
      const li=document.createElement("li");
      if (task.completed) 
        li.classList.add("completed");

      const span=document.createElement("span");
      span.innerText=task.text;
      span.onclick= () => toggleTask(i);

      const meta=document.createElement("div");
      meta.className="task-meta";

      const priority=document.createElement("span");
      priority.className=`priority-${task.priority}`;
      priority.innerText=`🔖 ${task.priority}`;

      const due=document.createElement("span");
      const dueDate=new Date(task.due);
      const now=new Date();
      const daysLeft=Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
      due.innerText=task.due ? `📅 ${daysLeft >= 0 ? `${daysLeft}d left` : 'Overdue'}` : "";

      meta.append(priority, due);

      const del=document.createElement("button");
      del.innerText="🗑️";
      del.onclick= () => deleteTask(i);

      li.append(span, meta, del);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const text=document.getElementById("taskInput").value.trim();
    const priority=document.getElementById("prioritySelect").value;
    const due=document.getElementById("dueDate").value;

    if (!text) return alert("Enter task description.");
    users[currentUser].tasks.push({ text, priority, due, completed: false });
    saveData();
    renderTasks();
    document.getElementById("taskInput").value="";
    document.getElementById("dueDate").value="";
  }

  function toggleTask(i) {
    users[currentUser].tasks[i].completed=!users[currentUser].tasks[i].completed;
    saveData();
    renderTasks();
  }

  function deleteTask(i) {
    users[currentUser].tasks.splice(i,1);
    saveData();
    renderTasks();
  }

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href="index.html";
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  window.addTask=addTask;
  window.logout=logout;
  window.toggleTheme=toggleTheme;

  renderTasks();
}
