function songs(arr) {
    class Song {
        constructor(typeList, name, time) {
            this.list = typeList
            this.name = name
            this.time = time
            this.print = () => console.log(this.name);
        }
    }

    let numberOfSongs = arr.shift()
    let actualList = arr.pop()
    let printArr = []

    for (el of arr) {
        let songsArr = el.split('_')
        let song = new Song(songsArr[0], songsArr[1], songsArr[2])
        printArr.push(song)
    }

    if (actualList === 'all') {
        printArr.forEach(s => s.print())
    } else {
        printArr
            .filter(s => s.list === actualList)
            .forEach(song => song.print())
    }
}
songs([2,
    'like_Replay_3:15',
    'ban_Photoshop_3:48',
    'all']  
)