const viewElement = document.getElementById('view');
const inputTextElement = document.getElementById('input-text');
const formElement = document.querySelector("#input-area > form");
let current_room = "entrance";

function createDialogue(text, compGenerated) {
    const dialougElement = document.createElement('div');
    dialougElement.classList.add('dialogue');
    let content = text;
    if (compGenerated) {
        dialougElement.classList.add('left');
        content = content.replace(directionRegx, "<span class='direction'>$&</span>");
    }
    else {
        content = content.replace(commandRegx, "<span class='command'>$&</span>");
    }
    dialougElement.innerHTML = content;
    viewElement.appendChild(dialougElement);
    return dialougElement;
}


function getRoomDescription(room_key) {
    let description = "";
    const room = rooms[room_key];
    description = room['description'];
    for (exitKey in room['exits']) {
        description = description.concat("\n", room['exits'][exitKey]['description'])
    }
    return description;
}
function getExitNextRoom(roomKey, exitKey) {
    return rooms[roomKey]['exits'][exitKey]['next_room'];
}

function hasExitKeyInRoom(roomKey, exitKey) {
    const room = rooms[roomKey];
    return exitKey in room['exits'];
}
function changeRoom(newRoomKey) {
    current_room = newRoomKey;
    createDialogue(getRoomDescription(current_room), true);
}

