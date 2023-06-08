const verbs = {"go":0, "pick":1, "choose":2};
const preposition = {"to":0,"in":1,"from":2,"up":3,"with":4,"on":5};
const directions = {"north":0, "south":1, "east":2, "west":3};
const word = {"box":0, "wooden":1, "stick":2, "bag":3, "stone":4, "troll":5, "iron":6, "sword":7};
const number = {"0":0, "1":1, "2":2, "3":3, "4":4};
const gameObjects = {"iron sword":0, "wooden stick":1, "wooden troll":2};
const objs = "verb word direction";
const clean = {"a":0, "an":1, "the":2};
const tokenPatterns = [
    {type: "verb", pattern: verbs},
    {type: "preposition", pattern: preposition},
    {type:"direction", pattern: directions},
    {type:"word", pattern: word},
    {type:"number", pattern: number},
    {type:"null", pattern: clean},
];
let commandResult = new CommandResult();
function CommandResult(){
    this.code = "";
    this.args = [];
}
function clearCommandResult(){
    commandResult = new CommandResult();
}
function Token(tokenType, literal, value){
    this.tokenType = tokenType;
    this.literal = literal;
    this.value =value;
}
/**
 * Represents Node of AST(Abstract Syntax Tree) 
 * @param {String} type type of node
 * @param {Number} value value of node
 * @param {String} literal contains string value of token. 
 * @param {Node} left left child of node
 * @param {Node} right right child of node
 */
function Node(type, value,literal, left, right){
    this.type = type;
    this.value = value;
    this.literal = literal,
    this.left = left;
    this.right = right;
}
function TerminalNode(type, value, literal){
    return new Node(type, value, literal, null, null);
}
function evaluate(node){
    if(node == null){
        return;
    }
    evaluate(node.left);
    if(objs.includes(node.type) || node.type == "number"){
        commandResult.code += `${node.value}`;
    }
    if(node.type == "word" || node.type == "direction" || node.type == "number"){
        commandResult.args.push(node.literal);
    }
    evaluate(node.right);
}
function parseNext(tokens, prev){
    let tok = tokens[0];
    if(tok.tokenType == "EOF"){
        return prev;
    }
    if(prev == null && objs.includes(tok.tokenType)){
        tokens.shift();
        return parseNext(tokens, new TerminalNode(tok.tokenType,tok.value, tok.literal));
    }
    else if(prev == null && tok.tokenType == "number"){
        tokens.shift();
        return parseNext(tokens, new Node("join", 0, "", new TerminalNode("verb", 2, "choose"), new TerminalNode(tok.tokenType, tok.value, tok.literal)));
    }
    else if(prev.type == "verb" && (tok.tokenType == "direction" || tok.tokenType == "word" || tok.tokenType == "number")){
        let right = parseNext(tokens, null);
        return new Node("join", 0, "", prev, right);
    }
    else if(tok.tokenType == "preposition"){
        tokens.shift();
        let right = parseNext(tokens, null);
        return new Node(tok.tokenType,tok.value, tok.literal, prev, right);
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
    let err = "";
    if(tokensObj.tokens != null){
        const tokens = tokensObj.tokens;
        tokens.forEach(element => {
            console.log(element);
        });
        const sentence = parseNext(tokens, null);
        // console.log(sentence);
        return({
            sentence: sentence,
            err: err,
        });
    }
    else{
        err = `[ERROR] : ${tokensObj.err}`;
        return({
            sentence: null,
            err: err,
        });
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
            let keys = Object.keys(item.pattern);
            if(keys.includes(word)){
                if(item.type == "null"){
                    counter = 0;
                    break;
                }
                tokens.push( new Token(item.type , word, item.pattern[word]));
                counter = 0;
                break;
            }
        }
        if(counter != 0){
            err = `Unexpected token ${word}`;
            return({
                tokens: null,
                err: err,
            });
        }
    }
    tokens.push(new Token("EOF", null, 0));
    let combineWord = "";
    let goKeys = Object.keys(gameObjects);
    let cur = tokens.shift();
    while(cur.tokenType != "EOF"){
        let next = tokens[0];
        if(cur.tokenType == "word" && next.tokenType == "word"){
            combineWord = `${cur.literal} ${next.literal}`;
            if(goKeys.includes(combineWord)){
                newTokens.push(new Token(cur.tokenType,combineWord, gameObjects[combineWord]));
                cur = tokens.shift();
                cur = tokens.shift();
            }
            else{
                newTokens.push(cur);
                cur = tokens.shift();
            }
        }
        else{
            newTokens.push(cur);
            cur = tokens.shift();
        }
    }
    newTokens.push(new Token("EOF", null, 0));
    return ({
        tokens: newTokens,
        err: err,
    });
}

// parseCommand("attack troll with he iron sword");
// parseCommand("attack on a wooden troll with the iron sword");