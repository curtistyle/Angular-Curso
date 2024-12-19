interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015
    }
}

// @ts-ignore
const song = 'New Song';
/*
const {
    song:anotherSong,
    songDuration:duration,
    details: { author },
} = audioPlayer;
*/

const { song:anotherSong, songDuration:duration, details } = audioPlayer;
const { author } = details;

/*
const { song } = audioPlayer; // del objeto audioPlayer quiero la propiedad song
console.log('Song: ', song);
*/


console.log('Song: ', anotherSong);
console.log('Duration: ', duration);
// console.log('Author: ', audioPlayer.details.author);
console.log('Author: ', author);

// * destructiracion con arreglos

// const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
// console.log('Personaje 3: ', dbz[2] || 'Personaje no encontrado');

// @ts-ignore
const [ p1, p2, trunks = 'Not found' ]: string[] = ['Goku', 'Vegeta', ];
console.error('Personaje 3: ', trunks);