import React from 'react';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { Dispatch } from 'redux';
import { ChatMessageType, renderLocationMessage } from '..';

export const renderCustomBubble = (props: BubbleProps<IMessage> & ChatMessageType, dispatch : Dispatch<any>) : React.ReactNode => {

    if (props.currentMessage?.messageType === 'location') {
        return renderLocationMessage(props, dispatch)
    }

    else if (props.currentMessage?.messageType === 'icon') {
        return null
    }

}