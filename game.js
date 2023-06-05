formElement.addEventListener("submit", onSumbit);

function onSumbit(e) {
    e.preventDefault();
    const command = inputTextElement.value;
    if (command == "") {
        return;
    }
    const dialogue = createDialogue(command, false);
    viewElement.appendChild(dialogue);
    inputTextElement.value = "";
    processCommnad(command);
}

function processCommnad(command) {
    command = command.toLowerCase();
    const keywords = command.trim().split(" ");
    switch (keywords[0]) {
        case "go":
            navigate(keywords[1]);
            break;

        default:
            createDialogue("Sorry! can't recognize command.", true);
            break;
    }
}

function navigate(direction) {
    if (hasExitKeyInRoom(current_room, direction)) {
        changeRoom(getExitNextRoom(current_room, direction));
    }
    else {
        createDialogue(`There is no way in ${direction}.`, true);
    }
}

createDialogue(getRoomDescription(current_room), true);