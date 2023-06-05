
const commandRegx = /\b(go|look}choose|take|inspect|drop|use|inventory)/gi;
const directionRegx = /\b(north|south|east|west)/gi;
const keywordsRegx = /\b(Enchanted Amulet|Eldoria|Malachi|Forest of Whispers)/gi;
const itemRegx = /\b(wooden-stick)/gi;
const rooms = {
    introduction_1: {
        description: "Once upon a time, in the mystical land of Eldoria, there existed an ancient and powerful artifact known as the Enchanted Amulet. Legends whispered that it possessed unimaginable abilities, granting its possessor untold magical powers. For centuries, many brave adventurers had embarked on quests to locate the amulet, but none had ever returned.",
        image: "images/artifact.png",
        options: [
            {
                next_room: 'introduction_2',
                description: 'Continue',
            },
        ],
    },
    introduction_2: {
        description: "You find yourself in a small village on the outskirts of Eldoria, where rumors of the amulet's recent discovery have spread like wildfire. The village elder approaches you, recognizing the courage in your eyes, and shares the tale of the Enchanted Amulet.",
        image: "images/village.png",
        options: [
            {
                next_room: 'back_story',
                description: 'Wants to listen to the tale.',
            },
            {
                next_room: 'death_by_elder',
                description: 'Don\'t want to listen to crap.',
            },
        ],
    },
    back_story: {
        description: "Long ago, an evil sorcerer named Malachi had stolen the amulet, using its power to plunge Eldoria into darkness and chaos. The villagers, tired of living in fear, banded together to defeat Malachi, but the amulet was lost during the epic battle.",
        image: "images/evil_sorcerer.png",
        options: [
            {
                next_room: 'introduction_3',
                description: 'Want to defeat Malachi, and restore balance.',
            },
            {
                next_room: 'death_by_elder',
                description: 'Want to chicken out!',
            },
        ],
    },
    death_by_elder: {
        description: "Elder gets angry by your response and beats you to death. LOL!!",
        options: [
            {
                next_room: 'introduction_1',
                description: 'Restart Game',
            },
        ],
    },
    introduction_3: {
        description: "Driven by a sense of purpose and the desire to bring peace back to Eldoria, you accept the challenge to embark on a perilous journey to retrieve the Enchanted Amulet. Armed with only your wit and the villagers' blessings, you venture into the treacherous realm.",
        image: "images/village.png",
        options: [
            {
                next_room: "forest_entrance",
                description: "Continue",
            },
        ],
    },
    forest_entrance: {
        description: "Land of Eldoria starts with a dense and mysterious woodland, where ancient trees whisper secrets and magical creatures roam knows as Forest of Whispers.",
        image: "images/forest_entrance.png",
        exits: {
            north: {
                next_room: 'forest_1',
                description: 'There is an untravelled path going in north which disappears in dense forest.',
            },
        },
        items: {
            'wooden-stick': {
                name: "wooden-stick",
                room_description: "A wooden-stick is lying on the ground.",
                description: "A wooden-stick protects you from creatures by attacking them.",
                damage: 1,
            },
        },
    },
};