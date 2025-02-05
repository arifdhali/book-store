class SocketsManager {
    constructor() {
        this.io = null;
    }
    init(io) {
        this.io = io;
    }
    sendingLiveUpdate(event, data) {
        try {
            if (!this.io) {
                console.error("❌ SocketManager: io not initialized!");
                return;
            }
            this.io.emit(event, data);
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new SocketsManager();