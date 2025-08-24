

const roomHandler = async(io,Socket)=>{
    Socket.on('JoinChannel',async(data,cb)=>{
        const roomId = data.channel;
        Socket.join(roomId);
        console.log(`user joined a channel ${roomId}`);
        cb?.({
            data : roomId,
            message:'Joined a Room',
            sender:Socket.id,
        })
    })
}


export default roomHandler;