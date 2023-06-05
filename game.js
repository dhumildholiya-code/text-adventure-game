formElement.addEventListener("submit", onSumbit);

function onSumbit(e) {
    e.preventDefault();
    const command = inputTextElement.value;
    if (command == "") {
        return;
    }
    const dialogue = createDialogue(command, false);
    viewContentElement.appendChild(dialogue);
    inputTextElement.value = "";
    processCommnad(command);
    viewContentElement.scrollTop = viewContentElement.scrollHeight;
}

function processCommnad(command) {
    command = command.toLowerCase();
    const keywords = command.trim().split(" ");
    switch (keywords[0]) {
        case "go":
            navigate(keywords[1]);
            break;
        case "choose":
            choose(parseInt(keywords[1]) - 1);
            break;

        default:
            createDialogue("Sorry! can't recognize command.", true);
            break;
    }
}

function choose(choiceId) {
    if (Number.isInteger(choiceId)) {
        if (validateChoiceIndex(choiceId)) {
            const nextRoomKey = getChoiceNextRoom(choiceId);
            changeRoom(nextRoomKey);
        }
        else {
            createDialogue(`Choice ${choiceId} doesn't exist.`, true);
        }
    }
    else {
        createDialogue("Choice is not a valid integer!", true);
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

createDialogue(getHtmlRoomDescription(current_room), true);
inputTextElement.focus();