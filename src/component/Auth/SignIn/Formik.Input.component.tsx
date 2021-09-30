import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputElement, InputProps, Icon } from '@ui-kitten/components';
import { useFormikContext } from 'formik';

interface FormInputProps extends InputProps {
    id : string;
}

export const FomikInputComponent = ({id, ...inputProps}: FormInputProps): InputElement => {

    const formContext = useFormikContext();

    // @ts-ignore Formik이 타입을 지원하지 않음 (무시)
    const { [id] : errors} = formContext.errors;
    const fieldProps: Partial<InputProps> = {
      status: errors && 'danger',
      caption: errors && <Icon {...(styles.captionIcon)} name='alert-circle-outline'/>,
      textStyle: { color: 'red' }
    };

    return(
        <Input
            {...inputProps}
            {...fieldProps}
            caption={errors}
            style={styles.input}
            textStyle={{color: 'black'}}
            placeholderTextColor={'#D2D2D2'}
            size='large'
            onChangeText={formContext.handleChange(id)}
        />
    )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor: '#00ff0000',
        borderColor: '#00ff0000',
        borderBottomColor: '#8797FF',
        borderBottomWidth: 2,
        borderRadius: 2,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 0,
        width: '100%'
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "opensans-regular",
        color: "#8F9BB3",
    }
})