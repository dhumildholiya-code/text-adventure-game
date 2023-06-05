const viewContentElement = document.getElementById('view-content');
const inputTextElement = document.getElementById('input-text');
const formElement = document.querySelector("#input-area > form");
let current_room = "introduction_1";

function createDialogue(text, compGenerated) {
    const dialougElement = document.createElement('div');
    dialougElement.classList.add('dialogue');
    let content = text;
    if (compGenerated) {
        dialougElement.classList.add('left');
        content = content.replace(directionRegx, "<span class='direction'>$&</span>");
        content = content.replace(keywordsRegx, "<span class='direction'>$&</span>");
    }
    else {
        content = content.replace(commandRegx, "<span class='command'>$&</span>");
    }
    dialougElement.innerHTML = content;
    viewContentElement.appendChild(dialougElement);
    return dialougElement;
}


function getHtmlRoomDescription(room_key) {
    let description = "";
    if (!(room_key in rooms)) {
        console.log(`${room_key} does not exist in rooms.`);
        description = "There is some techincal issue. Sorry! Try again.";
        return description;
    }
    const room = rooms[room_key];
    description = room['description'];
    for (exitKey in room['exits']) {
        description = description.concat("\n<br>", room['exits'][exitKey]['description']);
    }
    description = description.concat("\n", "<ol class='options'>");
    for (option in room['options']) {
        const data = room['options'][option]['description'];
        description = description.concat("\n<li>", `${data}</li>`);
    }
    description = description.concat("\n", "</ol>");
    return description;
}
function getExitNextRoom(roomKey, exitKey) {
    return rooms[roomKey]['exits'][exitKey]['next_room'];
}
function getChoiceNextRoom(choiceId) {
    return rooms[current_room]['options'][choiceId]['next_room'];
}

function validateChoiceIndex(choiceId) {
    const room = rooms[current_room];
    if ('options' in room) {
        if (choiceId >= 0 && choiceId < room['options'].length) {
            return true;
        }
    }
    return false;
}
function hasExitKeyInRoom(roomKey, exitKey) {
    const room = rooms[roomKey];
    return exitKey in room['exits'];
}
function changeRoom(newRoomKey) {
    current_room = newRoomKey;
    createDialogue(getHtmlRoomDescription(current_room), true);
}

