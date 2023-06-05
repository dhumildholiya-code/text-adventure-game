const viewContentElement = document.getElementById('view-content');
const viewElement = document.getElementById('view');
const inputTextElement = document.getElementById('input-text');
const formElement = document.querySelector("#input-area > form");
let current_room = "introduction_1";

function createDialogue(text, compGenerated = true) {
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
    content = content.replace(itemRegx, "<span class='direction'>$&</span>");
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
    for (const itemName in room['items']) {
        description = description.concat("\n<br>", room['items'][itemName]['room_description']);
    }
    description = description.concat("\n", "<ol class='list'>");
    for (option in room['options']) {
        const data = room['options'][option]['description'];
        description = description.concat("\n<li>", `${data}</li>`);
    }
    description = description.concat("\n", "</ol>");
    return description;
}
function getHtmlItemInspection(itemObj) {
    let content = "";
    content = `${itemObj['description']} It does damage of ${itemObj['damage']}.`;
    return content;
}
function getItemObj(roomKey, itemName) {
    if ('items' in rooms[roomKey]) {
        return rooms[roomKey]['items'][itemName];
    }
    return null;
}
function removeItemObj(roomKey, itemName) {
    if ('items' in rooms[roomKey]) {
        if (itemName in rooms[roomKey]['items']) {
            delete rooms[roomKey]['items'][itemName];
            return true;
        }
    }
    return false;
}
function getExitNextRoom(roomKey, exitKey) {
    return rooms[roomKey]['exits'][exitKey]['next_room'];
}
function getChoiceNextRoom(choiceId) {
    return rooms[current_room]['options'][choiceId]['next_room'];
}

function hasItemInRoom(itemName) {
    const room = rooms[current_room];
    if ('items' in room) {
        return itemName in room['items'];
    }
    return false;
}
function hasChoiceIndex(choiceId) {
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
    viewElement.style.backgroundImage = `url(${rooms[current_room]['image']})`;
    createDialogue(getHtmlRoomDescription(current_room));
}

