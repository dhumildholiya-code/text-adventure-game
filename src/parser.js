const verbs = ["go", "pick", "attack"];
const preposition = ["to","in","from","up","with","on"];
const directions = ["north", "south", "east", "west"];
const word = ["box", "wooden", "stick", "bag", "stone", "troll", "iron", "sword"];
const gameObjects = ["iron sword", "wooden stick"];
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
function TerminalNode(type, value){
    return new Node(type, value , null, null);
}

function parseNext(tokens, prev){
    let tok = tokens[0];
    if(tok.tokenType == "EOF"){
        return prev;
    }
    if(prev == null && (tok.tokenType == "verb" || tok.tokenType == "word")){
        tokens.shift();
        return parseNext(tokens, new TerminalNode(tok.tokenType, tok.literal));
    }
    else if(prev.type == "verb" && (tok.tokenType == "direction" || tok.tokenType == "word")){
        let right = parseNext(tokens, null);
        return new Node("join", "", prev, right);
    }
    else if(tok.tokenType == "preposition"){
        tokens.shift();
        let right = parseNext(tokens, null);
        return new Node(tok.tokenType, tok.literal, prev, right);
    }
    else{
        return prev;
    }
}
/**
 * parse user input into a form which game can understand.
 * @param {String} source user input
 */
function parseCommand(source){
    const tokensObj = tokenizer(source);
    if(tokensObj.err == ""){
        const tokens = tokensObj.tokens;
        // const sentence = parseNext(tokens, null);
        // console.log(sentence);
        tokens.forEach(element => {
            console.log(element);
        });
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
    const newTokens=[];
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
            return({
                tokens: [],
                err: err,
            });
        }
    }
    let combineWord = "";
    for(let i=0;i<tokens.length - 1;i++){
        if(tokens[i].tokenType == "word" && tokens[i+1].tokenType =="word"){
            combineWord = `${tokens[i].literal} ${tokens[i+1].literal}`;
            if(gameObjects.includes(combineWord)){
                newTokens.push(new Token("word", combineWord));
            }
        }
        else{
            newTokens.push(tokens[i]);
            combineWord = "";
        }
    }
    newTokens.push(new Token("EOF", null));
    return ({
        tokens: newTokens,
        err: err,
    });
}

// parseCommand("attack troll with he iron sword");
parseCommand("attack on a troll with the iron sword");