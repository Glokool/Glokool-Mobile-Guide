// 프로필 입력값 검증 모델
// 이메일 모양, 자기소개 최대 글자 수 등 검증할게요~

import * as Yup from 'yup';

export class ProfileData {
    constructor(
        readonly email: string | undefined,
        readonly name: string | undefined,
        readonly contact: string | undefined,
        readonly oneLineIntro: string | undefined,
        readonly intro: string | undefined,
    ) { }

    static empty(): ProfileData {
        return new ProfileData(
            "", "", "", "", ""
        );
    }
}

export const ProfileValidationModel = Yup.object().shape({
    email: Yup.string().email("잘못된 이메일 형식입니다"),
    oneLineIntro: Yup.string().max(40, '최대 입력길이는 40자입니다'),
    //사실 최대 글자 몇자인지 몰라서 확인해보고 수정해야 합니다 40자 아닙니다
});