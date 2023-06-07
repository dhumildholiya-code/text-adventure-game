const verbs = {"go":0, "pick":1, "attack":2};
const preposition = {"to":0,"in":1,"from":2,"up":3,"with":4,"on":5};
const directions = {"north":0, "south":1, "east":2, "west":3};
const word = {"box":0, "wooden":1, "stick":2, "bag":3, "stone":4, "troll":5, "iron":6, "sword":7};
const gameObjects = {"iron sword":0, "wooden stick":1, "wooden troll":2};
const clean = {"a":0, "an":1, "the":2};
const tokenPatterns = [
    {type: "verb", pattern: verbs},
    {type: "preposition", pattern: preposition},
    {type:"direction", pattern: directions},
    {type:"word", pattern: word},
    {type:"null", pattern: clean},
];
function Token(tokenType, literal, value){
    this.tokenType = tokenType;
    this.literal = literal;
    this.value =value;
}
/**
 * Represents Node of AST(Abstract Syntax Tree) 
 * @param {String} type type of node
 * @param {Number} value value of node
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
        return parseNext(tokens, new TerminalNode(tok.tokenType, tok.value));
    }
    else if(prev.type == "verb" && (tok.tokenType == "direction" || tok.tokenType == "word")){
        let right = parseNext(tokens, null);
        return new Node("join", 0, prev, right);
    }
    else if(tok.tokenType == "preposition"){
        tokens.shift();
        let right = parseNext(tokens, null);
        return new Node(tok.tokenType, tok.value, prev, right);
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
        const sentence = parseNext(tokens, null);
        console.log(sentence);
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
                tokens: [],
                err: err,
            });
        }
    }
    let combineWord = "";
    let goKeys = Object.keys(gameObjects);
    for(let i=0;i<tokens.length - 1;i++){
        if(tokens[i].tokenType == "word" && tokens[i+1].tokenType =="word"){
            combineWord = `${tokens[i].literal} ${tokens[i+1].literal}`;
            if(goKeys.includes(combineWord)){
                newTokens.push(new Token("word", combineWord, gameObjects[combineWord]));
            }
        }
        else if(tokens[i].tokenType == "word" && tokens[i+1].tokenType !="word"){
            continue;
        }
        else{
            newTokens.push(tokens[i]);
            combineWord = "";
        }
    }
    newTokens.push(new Token("EOF", null, 0));
    return ({
        tokens: newTokens,
        err: err,
    });
}

// parseCommand("attack troll with he iron sword");
parseCommand("attack on a wooden troll with the iron sword");