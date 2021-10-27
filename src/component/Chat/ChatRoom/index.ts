// Image
//export { renderImage } from './Image/Chat.Image.component';
//export { ImageModal } from './Image/Chat.ImageModal.component'

// Location
//export { LocationModal } from './Location/LocationModal.component';
//export { renderLocationMessage } from './Location/LocationMessage.component';

// common
export { renderBubble } from './Common/Bubble.component';
export { renderInputToolbar } from './Common/InputToolBar.component';
export { renderLoading } from './Common/Loading.component';
export { renderSystemMessage } from './Common/SystemMessage.component';
export { renderTime } from './Common/Time.component'
export { renderAvatar } from './Common/Avatar.component'
//export { ChatTopTabBarComponent } from './Common/TopTabBar.component';
//export { ExtraKeyboardComponent } from './Common/ExtraKeyboard.component';
export { NoticeComponent } from './Common/Notice.component';
export { renderLoadEarlier } from './Common/LoadEarlier.component';
//export { EmojiKeyboardComponent } from './Common/EmojiKeyboard.component'
export { renderCustomBubble } from './Common/CustomBubble.component'

// Audio
//export { ChatAudioComponent } from './Audio/Audio.component';
//export { renderSound } from './Audio/Sound.component';
//export { AudioRecordComponent } from './Audio/AudioRecord.component';

export interface ChatMessageType {
    currentMessage : {
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
}




