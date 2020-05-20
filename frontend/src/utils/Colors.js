export const getHexColor=(color) => {
    switch(color){
        case 'NORMAL':
            return '#A8A77A';
        case 'FIGHTING':
            return '#C22E28';
        case 'FLYING':
            return '#A98FF3';
        case 'POISON':
            return '#A33EA1';
        case 'GROUND':
            return '#E2BF65';
        case 'ROCK':
            return '#B6A136';
        case 'BUG':
            return '#A6B91A';
        case 'GHOST':
            return '#735797';
        case 'STEEL':
            return '#B7B7CE';
        case 'FIRE':
            return '#EE8130';
        case 'WATER':
            return '#6390F0';
        case 'GRASS':
            return '#7AC74C';
        case 'ELECTRIC':
            return '#F7D02C';
        case 'PSYCHIC':
            return '#F95587';
        case 'ICE':
            return '#96D9D6';
        case 'DRAGON':
            return '#6F35FC';
        case 'DARK':
            return '#705746';
        case 'FAIRY':
            return '#D685AD';
        case 'UNKNOWN':
            return '#68A090';
        case 'SHADOW':
            return '#2f2f52';
        default:
            return '';
    }
}

export const ALL_TYPES = [
    'ALL',
    'NORMAL',
    'FIGHTING',
    'FLYING',
    'POISON',
    'GROUND',
    'ROCK',
    'BUG',
    'GHOST',
    'STEEL',
    'FIRE',
    'WATER',
    'GRASS',
    'ELECTRIC',
    'PSYCHIC',
    'ICE',
    'DRAGON',
    'DARK',
    'FAIRY',
    'UNKNOWN',
    'SHADOW'];