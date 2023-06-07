const verbs = ["go", "pick", "attack"];
const preposition = ["to","in","from","up","with"];
const directions = ["north", "south", "east", "west"];
const word = ["box", "wooden", "stick", "bag", "stone", "troll", "iron", "sword"];
const clean = ["a", "an", "the"];
const tokenPatterns = [
    {type: "verb", pattern: verbs},
    {type: "preposition", pattern: preposition},
    {type:"direction", pattern: directions},
    {type:"word", pattern: word},
    {type:"null", pattern: clean},
];
function Token(tokenType, literal){
    this.tokenType = tokenType;
    this.literal = literal;
}
/**
 * Represents Node of AST(Abstract Syntax Tree) 
 * @param {String} type type of node
 * @param {String} value value of node
 * @param {Node} left left child of node
 * @param {Node} right right child of node
 */
function Node(type, value, left, right){
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
}

/**
 * parse user input into a form which game can understand.
 * @param {String} source user input
 */
function parseCommand(source){
    const tokensObj = tokenizer(source);
    if(tokensObj.err == ""){
        const tokens = tokensObj.tokens;
        const sentence = {};
        for (const token of tokens) {
            console.log(token);
        }
    }
    else{
        console.log(`[ERROR] : ${tokensObj.err}`);
    }
}
/**
 * Converts source string into list of token.
 * @param {String} source user input
 */
function tokenizer(source){
    source = source.toLowerCase();
    sourceWords = source.split(" ");
    const tokens = [];
    let err = "";
    for (let i = 0; i < sourceWords.length; i++) {
        const word = sourceWords[i];
        if(word == "") continue;
        let counter = 0;
        for(const item of tokenPatterns){
            counter++;
            if(item.pattern.includes(word)){
                if(item.type == "null"){
                    counter = 0;
                    break;
                }
                tokens.push( new Token(item.type , word));
                counter = 0;
                break;
            }
        }
        if(counter != 0){
            err = `Unexpected token ${word}`;
            break;
        }
    }
    tokens.push(new Token("EOF", null));
    return ({
        tokens: tokens,
        err: err,
    });
}

// parseCommand("attack troll with he iron sword");
parseCommand("go to north");