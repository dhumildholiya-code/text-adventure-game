
const playerData = {
    items: {},
};

/** 
 * Add ItemObj to player iventory.
 * @param {object} itemObj
*/
function playerAddItem(itemObj) {
    playerData.items[itemObj['name']] = itemObj;
}
/**
 * get Html content to show for Player Inventory.
 */
function getHtmlPlayerInventory() {
    let content = "";
    const totalItems = Object.keys(playerData.items).length;
    content = content.concat("", `Inventory has : ${totalItems} Items.`);
    if (totalItems > 0) {
        content = content.concat("\n<br>", "<ul class='list'>");
        for (const itemKey in playerData.items) {
            content = content.concat("\n", `<li>${itemKey}</li>`);
        }
        content = content.concat("\n", "</ul>");
    }
    return content;
}