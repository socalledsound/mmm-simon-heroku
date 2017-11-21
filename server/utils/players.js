class Players  {
    constructor() {
        this.players = [];
    }

    addPlayer (player) {
        this.players.push(player);
        return player;
    }

    removePlayer(id) {
        var player = this.players.filter( (player) => player.id === id)[0];
        if(player) {
            this.players = this.players.filter( (player) => player.id != id);

        }
        console.log(this.players);
        return player
    }

    getPlayer(id) {
        return this.players.filter((player) => player.id === id)[0]
    }


    // getPlayerReadyList() {
    //
    //     return this.players.filter((player) => player.ready)
    //
    // }

    playerExists(name) {
        return this.players.find((player)=> player.name === name);
    }

    getPlayerList() {
        // var players = this.players.filter((player)=> user.room === room);
        // // var namesArray = users.map((user) => user.name);
      //  console.log(this.players);
        return this.players
    }

}

module.exports = {Players};
