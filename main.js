const input = document.querySelector(".input");
const button = document.querySelector(".add");
const taskList = document.querySelector(".tasks");

let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () =>
  localStorage.setItem("tasks", JSON.stringify(taskArray));

const renderTasks = () => {
  taskList.innerHTML = "";
  taskArray.forEach(({ id, title, completed }) => {
    taskList.innerHTML += `
      <div class="task ${completed ? "done" : ""}" data-id="${id}">
        ${title}
        <span class="del">Delete</span>
      </div>`;
  });
};

const addTask = (task) => {
  taskArray.push({ id: Date.now(), title: task, completed: false });
  saveTasks();
  renderTasks();
};

const toggleTaskStatus = (id) => {
  taskArray = taskArray.map((task) =>
    task.id === +id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
};

const deleteTask = (id) => {
  taskArray = taskArray.filter((task) => task.id !== +id);
  saveTasks();
  renderTasks();
};

button.addEventListener("click", () => {
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = "";
  }
});

taskList.addEventListener("click", (e) => {
  const id = e.target.closest(".task")?.dataset.id;
  if (e.target.classList.contains("del")) deleteTask(id);
  if (e.target.classList.contains("task")) toggleTaskStatus(id);
});

// Initial Render
renderTasks();
