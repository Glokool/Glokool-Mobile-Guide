// 입력값 검증 모델
// 이메일 모양이 맞는지 확인 (power0093@naver.com 이 아니면 경고 메시지)
// 패스워드 최소 길이 확인

import * as Yup from 'yup';

export class SignInData {

    constructor(
      readonly email: string,
      readonly password: string) {
    }
  
    static empty(): SignInData {
      return new SignInData(
        '',
        '',
      );
    }
}
  
export const AuthValidationModel = Yup.object().shape({
    email: Yup.string().email('잘못된 이메일 형식입니다'),
    password: Yup.string().min(8, '비밀번호는 8자보다 길어야합니다'),
});

