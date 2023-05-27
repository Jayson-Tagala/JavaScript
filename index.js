addEventListener("load", () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const taskContainer = document.querySelector("#tasks");
	let counter = localStorage.length;

	const createElement = (element, className) => {
		const newElement = document.createElement(element);
		newElement.classList.add(className);
		return newElement;
	};

	const displayTodos = (currentTask, index) => {
		// Card task
		const taskHolder = createElement("div", "task");
		// Card task text container
		const taskContent = createElement("div", "content");

		// Editable task
		const taskContentInput = createElement("input", "text");
		taskContentInput.type = "text";
		taskContentInput.value = currentTask;
		taskContentInput.setAttribute("readOnly", "readOnly");

		// Button container
		const buttonContainer = createElement("div", "actions");

		const editButton = createElement("button", "edit");
		editButton.innerText = "Edit";

		const deleteButton = createElement("button", "delete");
		deleteButton.innerText = "Delete";

		buttonContainer.appendChild(editButton);
		buttonContainer.appendChild(deleteButton);

		taskHolder.appendChild(taskContent);
		taskHolder.appendChild(buttonContainer);
		taskContent.appendChild(taskContentInput);

		taskContainer.appendChild(taskHolder);

		buttonContainer.addEventListener("click", (e) => {
			console.log(e.target === editButton);
			switch (e.target) {
				case editButton:
					if (editButton.innerText.toLowerCase() == "edit") {
						taskContentInput.removeAttribute("readonly");
						taskContentInput.focus();
						editButton.innerText = "Save";
					} else {
						editButton.innerText = "Edit";
						localStorage.setItem(index, taskContentInput.value);
						taskContentInput.setAttribute("readOnly", "readOnly");
					}
					break;
				case deleteButton:
					taskContainer.removeChild(taskHolder);
					localStorage.removeItem(index);
					break;
			}
		});
		input.value = "";
	};

	for (let i = 0; i < counter; i++) {
		const currentTask = localStorage.getItem(localStorage.key(i));
		displayTodos(currentTask, localStorage.key(i));
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const currentTask = input.value;
		const storageLength = localStorage.length;

		if (!currentTask) {
			alert("Please enter a task");
			return;
		}

		localStorage.setItem(
			storageLength > 0 ? storageLength + 1 : 0,
			currentTask,
		);
		displayTodos(currentTask, storageLength + 1);
	});
});
