import io from 'socket.io-client'

export  function initIO() {
    if(!io.socket){
        // 连接服务器, 得到代表连接的 socket 对象
         io.socket = io('ws://localhost:4000')
        // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
        io.socket.on('receiveMsg', function (data) {
            console.log('浏览器端接收到消息:', data)
        })
    }

}
