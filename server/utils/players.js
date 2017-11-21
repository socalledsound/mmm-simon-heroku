class Players  {
    constructor() {
        this.players = [];
    }

    addPlayer (id,name, color, admin) {
        var player = {id, name, color, admin};
       
        this.players.push(player);
        return player;
    }
    
    removePlayer(id) {
        var player = this.players.filter((player) => player.id === id)[0];
        if(player) {
            this.players = this.players.filter((player)=>player.id != id);
            
        }
        return player
    }

    getPlayer(id) {
        return this.players.filter((player) => player.id === id)[0]
        
    }

    playerExists(name) {
        return this.players.find((player)=> player.name === name);
    }

    getPlayerList() {
        // var players = this.players.filter((player)=> user.room === room);
        // // var namesArray = users.map((user) => user.name);
        return this.players
    } 
    
}

module.exports = {Players};