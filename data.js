
const commandRegx = /\b(go|take|choose)/gi;
const directionRegx = /\b(north|south|east|west)/gi;
const keywordsRegx = /\bEnchanted Amulet/gi;
const rooms = {
    'introduction_1': {
        'description': "Once upon a time, in the mystical land of Eldoria, there existed an ancient and powerful artifact known as the Enchanted Amulet. Legends whispered that it possessed unimaginable abilities, granting its possessor untold magical powers. For centuries, many brave adventurers had embarked on quests to locate the amulet, but none had ever returned.",
        'options': [
            {
                'next_room': 'introduction_2',
                'description': 'Continue',
            },
        ],
    },
    'introduction_2': {
        'description': "You find yourself in a small village on the outskirts of Eldoria, where rumors of the amulet's recent discovery have spread like wildfire. The village elder approaches you, recognizing the courage in your eyes, and shares the tale of the Enchanted Amulet.",
        'options': [
            {
                'next_room': 'back_story',
                'description': 'Wants to listen to the tale.',
            },
            {
                'next_room': 'death_by_elder',
                'description': 'Don\'t want to listen to crap.',
            },
        ],
    },
    'back_story': {
        'description': "Long ago, an evil sorcerer named Malachi had stolen the amulet, using its power to plunge Eldoria into darkness and chaos. The villagers, tired of living in fear, banded together to defeat Malachi, but the amulet was lost during the epic battle.",
        'options': [
            {
                'next_room': 'entrance',
                'description': 'Want to defeat Malachi, and restore balance.',
            },
            {
                'next_room': 'death_by_elder',
                'description': 'Want to chicken out!',
            },
        ],
    },
    'death_by_elder': {
        'description': "Elder gets angry by your response and beats you to death. LOL!!",
        'options': [
            {
                'next_room': 'introduction_1',
                'description': 'Restart Game',
            },
        ],
    },
    'entrance': {
        'description': 'This is first room.',
        'exits': {
            'north': {
                'next_room': 'room_1',
                'description': 'There is bright light coming from north.',
            },
            'west': {
                'next_room': 'room_2',
                'description': 'There is door in west.',
            }
        },
        'items': [
        ],
    },
    'room_1': {
        'description': 'This is room_1',
        'exits': {
            'south': {
                'next_room': 'entrance',
                'description': 'There is a way behind you.',
            },
        },
        'items': [
        ],
    },
    'room_2': {
        'description': 'This is room_2',
        'exits': {
            'east': {
                'next_room': 'entrance',
                'description': 'there is door in east of you.',
            },
        },
        'items': [
        ],
    },
};