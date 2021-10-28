import React from 'react';
import storage from '@react-native-firebase/storage';
import { StyleSheet, Pressable, Platform, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../model';
import { Layout, Text } from '@ui-kitten/components';
import { setAudioVisiblityTrue, setMenuVisiblityFalse } from '../../../../model/chat/Chat.UI.model';
import { Images, Record, Camera } from '../../../../assets/icon/Chat/ChatRoom';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { AuthContext } from '../../../../context/AuthContext';
import { requestCameraPermission, requestStoragePermission } from '../../../Common/Permissions.component';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { SERVER } from '../../../../server';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';



export const ExtraKeyboardComponent = (props : any) : React.ReactElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    const ChatDB : FirebaseDatabaseTypes.Reference = props.ChatDB;
    const ChatRoomID : string = props.ChatRoomID;

    const menuVisiblity = useSelector((state : RootState) => state.ChatUIModel.menuVisiblity);
    const keyboardHeight = useSelector((state : RootState) => state.ChatKeyboardModel.keyboardHeight);
    const dispatch = useDispatch();

    const getAccessToken = async () => {
        try {
            const res = await axios.get(`${SERVER}/api/token`);
            setCurrentUser({ ...currentUser, ...res.data });
        } catch (e) {
            console.log('e', e);
        }
    };


    const FCMSend = async(message : any, messageType : string) => {
          
        if (currentUser.expiry_date < new Date().getTime()) {
            await getAccessToken();
        }
    
        const data = JSON.stringify({
            message: {
                notification: {
                    title: message.user.name,
                    body: messageType,
                },
                data: {
                    time: new Date(Date.now()).toString(),
                    roomId: ChatRoomID,
                },
                topic : ChatRoomID,
                webpush: {
                    fcm_options: {
                        link: 'guide/main/chat',
                    },
                },
            },
        });
    
        const options = {
            method: 'Post',
            url:
                'https://fcm.googleapis.com/v1/projects/glokool-a7604/messages:send',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.access_token}`,
            },
            data: data,
        };

        console.log('FCM 전송 시도')
    
        await axios(options).catch((e) => {
            if (e.response) {
                console.log(e.response.data);
            }
        });
    }



    /*이미지 촬영 */
    const takePhoto = async () => {

        dispatch(setMenuVisiblityFalse());

        try {
            const { granted } : any = await requestCameraPermission();

            if (!granted) {
                throw Error('Camera permission denied');
            }

            launchCamera(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    quality: 0.5,
                },
                (response) => {
                    if (response.assets != undefined) {

                        if (response.didCancel == true) {
                            throw Error('Camera Cancel');
                        } 
                        
                        else {

                            if (response.assets[0].type === undefined || response.assets[0].uri === undefined){
                                throw Error('카메라 촬영파일 불러오기 실패');
                            }

                            const newMessage = ChatDB.push();
                            const type : string = response.assets[0].type;
                            const imageType = type.split('/');
                            const reference = storage().ref();

                            const picRef = reference.child(`chats/${ChatRoomID}/picture/${newMessage.key}.${imageType[1]}`,).putFile(response.assets[0].uri);

                            picRef.on(storage.TaskEvent.STATE_CHANGED, 
                                function (snapshot) { // 업로드 도중 실행 함수
                                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                
                                    switch (snapshot.state) {
                                        case storage.TaskState.PAUSED:
                                            console.log('Upload is paused');
                                            break;
                                        case storage.TaskState.RUNNING:
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                function (error) { // 업로드 도중 실패 시 에러 함수
                                    switch (error.code) {
                                        case 'storage/unauthorized':
                                            break;

                                        case 'storage/canceled':
                                            break;

                                        case 'storage/unknown':
                                            break;
                                    }
                                },
                                function () {
                                    picRef.snapshot?.ref.getDownloadURL() // 업로드 성공 (Firebase Storage)
                                        .then(function (downloadURL : string) {
                                            
                                            let message = {
                                                _id : newMessage.key,
                                                user : {
                                                    _id : currentUser?.uid,
                                                    name : currentUser?.displayName
                                                },
                                                messageType : 'image',
                                                createdAt : new Date().getTime(),
                                                location : '',
                                                image : downloadURL,
                                                audio : '',
                                                text : ''
                                            };
                                
                                            newMessage?.set(message, (e) => {
                                                console.log('이미지 메시지 전송 실패 : ', e)
                                            });

                                            FCMSend(message, "Sent a picture");

                                    });
                                }
                            );
                        }
                    }
                },
            );
        } catch (e) {
            console.log('사진 촬영 에러', e);
        }
    };


    const ImageSend = async () => {

        dispatch(setMenuVisiblityFalse());

        try {
            const { granted } : any = await requestStoragePermission();
            
            if (!granted) {
                throw Error('Storage permission denied');
            }

            const images = await ImagePicker.openPicker((Platform.OS === 'ios')? {multiple : false, forceJpg : true} : {multiple : false});

            if (images != undefined) {
                
                const newMessage = ChatDB.push();
                const reference = storage().ref();
                const imageType = images.mime.split('/');
                const picRef = reference.child(`chats/${ChatRoomID}/picture/${newMessage.key}.${imageType}`,).putFile(images.path);

                picRef.on(storage.TaskEvent.STATE_CHANGED, 
                    function (snapshot) { // 업로드 도중 실행 함수
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    
                        switch (snapshot.state) {
                            case storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                                break;
                            case storage.TaskState.RUNNING:
                                console.log('Upload is running');
                                break;
                        }
                    },
                    function (error) { // 업로드 도중 실패 시 에러 함수
                        switch (error.code) {
                            case 'storage/unauthorized':
                                break;

                            case 'storage/canceled':
                                break;

                            case 'storage/unknown':
                                break;
                        }
                    },
                    function () {
                        picRef.snapshot?.ref.getDownloadURL() // 업로드 성공 (Firebase Storage)
                            .then(function (downloadURL : string) {
                                
                                let message = {
                                    _id : newMessage.key,
                                    user : {
                                        _id : currentUser?.uid,
                                        name : currentUser?.displayName
                                    },
                                    messageType : 'image',
                                    createdAt : new Date().getTime(),
                                    location : '',
                                    image : downloadURL,
                                    audio : '',
                                    text : ''
                                };
                    
                                newMessage?.set(message, (e) => {
                                    console.log('이미지 메시지 전송 실패 : ', e)
                                });

                                FCMSend(message, "Sent a picture");

                        });
                    }
                );


            }
        } 
        catch (e) {
            console.log('기존 저장 이미지 전송 에러 : ', e);
        }
    };


    return(
        <>
            {(menuVisiblity)?
                <Layout style={{ justifyContent: 'center', backgroundColor: '#F8F8F8', height: keyboardHeight, minHeight: 180}}>
                    <Layout style={styles.SideContainer}>
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => dispatch(setAudioVisiblityTrue())}>
                            <Record />
                            <Text style={styles.SideButtonTxt}>Voices</Text>
                        </Pressable>
        
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => ImageSend()}
                        >
                            <Images />
                            <Text style={styles.SideButtonTxt}>Images</Text>
                        </Pressable>
        
                        <Pressable
                            style={styles.SideButton}
                            onPress={() => takePhoto()}
                        >
                            <Camera />
                            <Text style={styles.SideButtonTxt}>Camera</Text>
                        </Pressable>
        
                    </Layout>
        
                    <Layout style={styles.SideContainer}></Layout>
                </Layout>
                :
                    null
                }
        </>
    )
}

const styles = StyleSheet.create({    
    SideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: '#F8F8F8',

    },
    SideButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 86,
        height: 65,
        marginTop: 10,
    },
    SideButtonTxt: {
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#8C8C8C',
        fontSize: 12,
    },
})