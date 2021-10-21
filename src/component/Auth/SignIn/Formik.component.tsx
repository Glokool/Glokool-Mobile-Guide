
import React from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import { SignInData } from '../../../model/auth/auth.validation.model';
import { Button, Icon, Layout } from '@ui-kitten/components';
import { FormikProps } from 'formik';
import { FomikInputComponent } from './Formik.Input.component';
import { useDispatch } from 'react-redux';
import { loading_end, loading_start } from '../../../model/auth/auth.model';


export const FormikComponent = (props: FormikProps<SignInData>): React.ReactFragment => {
    
    const FirebaseAuth = auth();
    const dispatch = useDispatch();

    //Re-Rendering이 자주 일어나지 않는 UI 관련 Hook
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    //비밀번호 입력창 Icon rendering
    const renderIcon = (props : any) : React.ReactElement => (
        <TouchableWithoutFeedback onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon {...props} name={!passwordVisible ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    //컨트롤을 위한 코드 (분리 가능)
    function SignIn(values : SignInData) : void {

        dispatch(loading_start());

        if (values.email != "" || values.password != "") {
            //빈칸일 경우 진행하지 않음
            FirebaseAuth.signInWithEmailAndPassword(values.email, values.password)
                .then((response) => {
                    dispatch(loading_end())
                })
                .catch((err) => {
                    console.log(err);
                })
        } 
    
    }

    return(
        <React.Fragment>
            <Layout style={styles.InputContainer}>
                <Text style={styles.InputTitle}>E-Mail</Text>
                    <FomikInputComponent
                        id='email'
                        style={styles.FormikInputContainer}
                        textStyle={{}}
                        placeholder='E-mail'
                        keyboardType='email-address'
                    />
            </Layout>

            <Layout style={styles.InputContainer}>
                <Text style={styles.InputTitle}>비밀번호</Text>
                    <FomikInputComponent
                        id='password'
                        style={styles.FormikInputContainer}
                        placeholder='비밀번호'
                        accessoryRight={renderIcon}
                        secureTextEntry={!passwordVisible}
                    />
            </Layout>

            <Text style={{fontFamily:'Pretendard-Bold'}}>HELLO</Text>
            <Text>HELLO</Text>

            <Button style={styles.LoginBtn} onPress={() => SignIn(props.values)}>
                로그인
            </Button>

            
            
        </React.Fragment>
    )

}

const styles = StyleSheet.create({
    LoginBtn: {
        width: '50%',
        height: '15%'
    },
    InputContainer: {

    },

    InputTitle : {

    },

    FormikInputContainer: {

    }
})