type ChatMessageType = {
    _id : string,
    messageType : string,
    text: string,
    location : {
        lat : string,
        lon : string
    }
    createdAt : string,
    user : {
        _id : string
    },
    image : string,
    audio : string
}