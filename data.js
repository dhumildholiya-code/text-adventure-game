
const commandRegx = /\b(go|take)/gi;
const directionRegx = /\b(north|south|east|west)/gi;
const rooms = {
    'entrance': {
        'id': 'entrance',
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
        'id': 'room_1',
        'description': 'This is room_1',
        'exits': {
            'south': {
                'next_room': 'entrance',
                'description': 'There is a way behine you.',
            },
        },
        'items': [
        ],
    },
    'room_2': {
        'id': 'room_2',
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