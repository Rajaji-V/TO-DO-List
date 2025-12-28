let users=JSON.parse(localStorage.getItem("users")) || {};

function login() {
  const u=document.getElementById("username").value.trim();
  const p=document.getElementById("password").value.trim();
  if (users[u]&&users[u].password===p) {
    localStorage.setItem("currentUser", u);
    window.location.href="pages/dashboard.html";
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

if (window.location.pathname.includes("pages/dashboard.html")) {
  const currentUser=localStorage.getItem("currentUser");
  if (!currentUser||!users[currentUser]) 
    location.href="index.html";

  document.getElementById("userGreeting").innerText=`👋 Hello, ${currentUser}`;
  const taskList=document.getElementById("taskList");

  function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function updateStats() {
    const tasks = users[currentUser].tasks;
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById("stats").innerHTML = `<p>📊 Total: ${total} | ✅ Completed: ${completed} | ⏳ Pending: ${total - completed}</p>`;
  }

  function renderTasks(filter = '') {
    taskList.innerHTML="";
    const tasks=users[currentUser].tasks;

    tasks.forEach((task, i) => {
      if (filter && !task.text.toLowerCase().includes(filter.toLowerCase())) return;
      const li=document.createElement("li");
      if (task.completed) 
        li.classList.add("completed");

      const span=document.createElement("span");
      span.innerText=task.text;
      span.contentEditable = true;
      span.onblur = () => {
        const newText = span.innerText.trim();
        if (newText && newText !== task.text) {
          users[currentUser].tasks[i].text = newText;
          saveData();
        } else if (!newText) {
          span.innerText = task.text; // revert if empty
        }
      };
      span.onclick= () => toggleTask(i);

      const meta=document.createElement("div");
      meta.className="task-meta";

      const priority=document.createElement("span");
      priority.className=`priority-${task.priority}`;
      priority.innerText=`🔖 ${task.priority}`;

      const category=document.createElement("span");
      category.innerText=`📂 ${task.category}`;

      const due=document.createElement("span");
      const dueDate=new Date(task.due);
      const now=new Date();
      const daysLeft=Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
      due.innerText=task.due ? `📅 ${daysLeft >= 0 ? `${daysLeft}d left` : 'Overdue'}` : "";

      meta.append(priority, category, due);

      const del=document.createElement("button");
      del.innerText="🗑️";
      del.onclick= () => deleteTask(i);

      li.append(span, meta, del);
      taskList.appendChild(li);
    });
    updateStats();
  }

  function addTask() {
    const text=document.getElementById("taskInput").value.trim();
    const priority=document.getElementById("prioritySelect").value;
    const category=document.getElementById("categorySelect").value;
    const due=document.getElementById("dueDate").value;

    if (!text) return alert("Enter task description.");
    users[currentUser].tasks.push({ text, priority, category, due, completed: false });
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
    window.location.href="../index.html";
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  function filterTasks() {
    const filter = document.getElementById("searchInput").value;
    renderTasks(filter);
  }

  function sortTasks() {
    const sortBy = document.getElementById("sortSelect").value;
    if (sortBy === 'priority') {
      users[currentUser].tasks.sort((a, b) => {
        const pri = { High: 3, Medium: 2, Low: 1 };
        return pri[b.priority] - pri[a.priority];
      });
    } else if (sortBy === 'due') {
      users[currentUser].tasks.sort((a, b) => new Date(a.due || '9999-12-31') - new Date(b.due || '9999-12-31'));
    } else if (sortBy === 'alpha') {
      users[currentUser].tasks.sort((a, b) => a.text.localeCompare(b.text));
    }
    saveData();
    renderTasks(document.getElementById("searchInput").value);
  }

  window.addTask=addTask;
  window.logout=logout;
  window.toggleTheme=toggleTheme;
  window.filterTasks=filterTasks;
  window.sortTasks=sortTasks;

  renderTasks();
}
