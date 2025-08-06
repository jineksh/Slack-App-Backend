import messageService from "../service/message.js";

const service = new messageService();

const messageHandler = async(io,Socket)=>{
    Socket.on('db messages',async(data,cb)=>{
        const messages = await service.create(data);
        io.emit('db messages',data);
        cb({
            message:'message received',
            sender:Socket.id,
            data : messages
        })
    })
}


export default messageHandler;