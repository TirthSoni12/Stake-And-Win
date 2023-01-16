$(document).ready(function () {
    setTimeout(async function () {
        //verify if player is already a member of the game
        await verifyPlayer()

    }, 800)
})

async function verifyPlayer() {
    for (let i = 1; i < counter; i++) {
        let player = await contract.methods.players(i).call()

        if (player === account[0]) {
            window.location.replace('../html/end_game.html')
        }
    }
}