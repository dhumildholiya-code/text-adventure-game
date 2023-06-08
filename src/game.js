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
    let sentenceObj = parseCommand(command);
    console.log(sentenceObj);
    if(sentenceObj.sentence != null){
        let sentence = sentenceObj.sentence;
        console.log(sentence);
    }
    else{
        createDialogue(sentenceObj.err);
    }
    // command = command.toLowerCase();
    // const keywords = command.trim().split(" ");
    // switch (keywords[0]) {
    //     case "go":
    //         navigate(keywords[1]);
    //         break;
    //     case "look":
    //         look();
    //         break;
    //     case "choose":
    //         choose(parseInt(keywords[1]) - 1);
    //         break;
    //     case "take":
    //         takeItem(keywords[1]);
    //         break;
    //     case "inspect":
    //         inspectItem(keywords[1]);
    //         break;
    //     case "inventory":
    //         showInventory();
    //         break;

    //     default:
    //         createDialogue("Sorry! can't recognize command.");
    //         break;
    // }
}

function showInventory() {
    const htmlContent = getHtmlPlayerInventory();
    createDialogue(htmlContent);
}
function takeItem(itemName) {
    if (hasItemInRoom(itemName)) {
        const itemObj = getItemObj(current_room, itemName);
        playerAddItem(itemObj);
        removeItemObj(current_room, itemName);
        createDialogue(`${itemName} stored in Inventory.`);
    }
    else {
        createDialogue(`${itemName} is invalid item.`);
    }
}
function inspectItem(itemName) {
    if (hasItemInRoom(itemName)) {
        const itemObj = getItemObj(current_room, itemName);
        createDialogue(getHtmlItemInspection(itemObj));
    }
    else {
        createDialogue(`${itemName} is invalid item.`);
    }
}
function choose(choiceId) {
    if (Number.isInteger(choiceId)) {
        if (hasChoiceIndex(choiceId)) {
            const nextRoomKey = getChoiceNextRoom(choiceId);
            changeRoom(nextRoomKey);
        }
        else {
            createDialogue(`Choice ${choiceId} doesn't exist.`);
        }
    }
    else {
        createDialogue("Choice is not a valid integer!");
    }
}
function look() {
    createDialogue(getHtmlRoomDescription(current_room));
}
function navigate(direction) {
    if (hasExitKeyInRoom(current_room, direction)) {
        changeRoom(getExitNextRoom(current_room, direction));
    }
    else {
        createDialogue(`There is no way in ${direction}.`);
    }
}

createDialogue(getHtmlRoomDescription(current_room));
inputTextElement.focus();