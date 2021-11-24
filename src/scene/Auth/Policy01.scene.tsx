import React, { } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { TopTab_GoBack } from '../../component/Common';
import { ScrollView } from 'react-native-gesture-handler';
import { windowHeight, windowWidth } from '../../Design.component';

export const PolicyScene_01 = () => {

    const policy01 = `1. “글로쿨”은 여행객을 위해 재화, 제반 "서비스"를 운영하는 사업자를 말하며, 아울러 재화 또는 제반 "서비스"를 사용자에게 제공하기 위하여 스마트폰 등 정보통신 설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장 및 사이버 몰을 운영하는 사업자의 의미로도 사용합니다.

2. “글로쿨 가이드”는 여행객를 위해 재화, 제반 "서비스"를 운영하는 사업자를 말하며, 아울러 재화 또는 제반 "서비스"를 사용자에게 제공하기 위하여 스마트폰 등 정보통신 설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장 및 사이버 몰을 운영하는 사업자의 의미로도 사용합니다.

3.  "서비스"란 접속 가능한 유, 무선 단말기와 웹사이트, 모바일 어플리케이션 등 제공 형태와 상관하지 아니하고 당사가 제공하는 모든 제반 "서비스"를 의미합니다.

4. “회원” 이란 회사에 개인정보를 제공하고 등록한 자로서, 글로쿨의 “서비스”의 정보를 지속적으로 제공받으며, 글로쿨의 “서비스”를 계속적으로 이용할 수 있는 자를 말합니다. 
`;

    const policy02 = `1. 다른 사람의 명의나 휴대전화 번호 등 개인정보를 이용하여 계정을 생성하려 한 경우

2. 동일인이 다수의 계정을 생성하려 한 경우

3. 계정 생성시 필요한 정보를 입력하지 않거나 허위 정보를 입력한 경우

4. 글로쿨이 과거에 운영원칙 또는 법률 위반 등의 정당한 사유로 해당 계정을 삭제 또는 징계한 경우

5. 사기 정보 모음 사이트나 정부기관 사이트 등에서 거래 사기 이력이 있는 휴대전화 번호로 확인된 경우
`
    const policy03 = `1. 잘못된 방법으로 서비스의 제공을 방해하거나 글로쿨이 안내하는 방법 이외의 다른 방법을 사용하여 글로쿨 서비스에 접근하는 행위

2. 다른 이용자의 정보를 무단으로 수집, 이용하거나 다른 사람들에게 제공하는 행위

3. 서비스를 영리나 홍보 목적으로 이용하는 행위

4. 음란 정보나 저작권 침해 정보 등 공서양속 및 법령에 위반되는 내용의 정보 등을 발송하거나 게시하는 행위

5. 글로쿨의 동의 없이 글로쿨 서비스 또는 이에 포함된 소프트웨어의 일부를 복사, 수정, 배포, 판매, 양도, 대여, 담보제공하거나 타인에게 그 이용을 허락하는 행위

6. 소프트웨어를 역설계하거나 소스 코드의 추출을 시도하는 등 글로쿨 서비스를 복제, 분해 또는 모방하거나 기타 변형하는 행위

7. 관련 법령, 글로쿨의 모든 약관 또는 정책을 준수하지 않는 행위
`

    const policy04 = `1. 글로쿨 서비스 사용자가 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.

2. 사용자가 서비스 내에 게시하는 게시물은 검색결과 내지 서비스 및 관련 프로모션, 광고 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 글로쿨은 저작권법 규정을 준수하며, 사용자는 언제든지 고객센터 또는 운영자 문의 기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 요청할 수 있습니다.

3. 위 2항 이외의 방법으로 사용자의 게시물을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 사용자의 동의를 얻어야 합니다.
`

    return (
        <Layout style={styles.MainContainer}>
            <TopTab_GoBack title={'이용약관'} />
            <ScrollView style={styles.ScrollViewContainer}>

                <Text style={styles.TitleText}>이용 약관</Text>
                <Text style={styles.SubtitleText}>
                    본 약관은 글로쿨이 운영하는 글로쿨 “서비스” 와 글로쿨 가이드 “서비스”를 이용함에 있어 ‘회사’와 ‘회원’의 권리와 의무, 책임사항을 정함을 목적으로 한다.
                </Text>

                <Text style={styles.TitleText}>용어의 정의</Text>
                <Text style={styles.SmallText}>{policy01}</Text>

                <Text style={styles.TitleText}>계정 관련</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 모바일 서비스 특성상 별다른 비밀번호 없이 휴대전화 번호만으로 계정을 생성하실 수 있습니다. 다만, 실제 휴대전화의 소유주임을 확인하기 위해서 가입 당시 인증 절차를 거치게 됩니다. 또한, 다른 모바일 기기에서 서비스 사용을 연속하기 위해서는 기존에 가입하고 인증했던 휴대전화 번호로 재인증을 해야 합니다. 아래의 경우에는 계정 생성을 승인하지 않을 수 있습니다.
                </Text>
                <Text style={styles.SmallText}>{policy02}</Text>
                <Text style={styles.SubtitleText}>
                    계정은 본인만 이용할 수 있고, 다른 사람에게 이용을 허락하거나 양도할 수 없습니다. 사용자는 계정과 관련된 정보, 즉 프로필 사진이나 소개글 등을 변경할 수 있습니다. 휴대폰 번호가 바뀐 경우에는 서비스 내 설정 메뉴나 고객센터 문의를 통해 새 휴대폰 번호로 인증절차를 걸쳐 수정할 수 있습니다.
                </Text>

                <Text style={styles.TitleText}>사용 시 주의해야 할 점</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 사용자가 아래와 같이 잘못된 방법이나 행위로 서비스를 이용할 경우 사용에 대한 제재(이용정지, 강제탈퇴 등)를 가할 수 있습니다.
                </Text>
                <Text style={styles.SmallText}>{policy03}</Text>

                <Text style={styles.TitleText}>개인정보 보호 관련</Text>
                <Text style={styles.SubtitleText}>
                    개인정보는 글로쿨 서비스의 원활한 제공을 위하여 사용자가 동의한 목적과 범위 내에서만 이용됩니다. 개인정보 보호 관련 기타 상세한 사항은 글로쿨 개인정보처리방침을 참고하시기 바랍니다.
                </Text>

                <Text style={styles.TitleText}>게시물의 저작권 보호</Text>
                <Text style={styles.SmallText}>{policy04}</Text>

                <Text style={styles.TitleText}>사용 권리</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 서비스 이용을 위하여 양도불가능하고 무상의 라이선스를 사용자분들에게 제공합니다. 다만, 글로쿨 상표 및 로고를 사용할 권리를 사용자분들에게 부여하는 것은 아닙니다.
                </Text>

                <Text style={styles.TitleText}>서비스 고지 및 홍보내용 표시</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 서비스 사용자분의 편의를 위해 서비스 이용과 관련된 각종 고지 및 기타 글로쿨 서비스 홍보를 포함한 다양한 정보를 글로쿨 서비스에 표시하거나 사용자의 휴대폰 문자, 알림 메시지(Push Notification) 등으로 발송할 수 있으며 서비스 사용자분은 이에 동의합니다. 이 경우 서비스 사용자분의 통신환경 또는 요금구조에 따라 서비스 사용자분이 데이터 요금 등을 부담할 수 있습니다. 한편 글로쿨은 서비스 사용자분이 수집에 동의한 서비스 내 활동 정보를 기초로 글로쿨에게 직접적인 수익이 발생하지 않거나 글로쿨이 판매하는 상품과 직접적인 관련성이 없는 한도에서 다른 서비스 사용자분 등이 게시한 게시물을 위와 같은 방법으로 서비스 사용자분에게 보낼 수 있으며 서비스 사용자분은 이에 동의합니다. 물론 서비스 사용자분은 관련 법령상 필요한 내용을 제외하고 언제든지 이러한 정보에 대한 수신 거절을 할 수 있으며, 이 경우 글로쿨은 즉시 위와 같은 정보를 보내는 것을 중단합니다.
                </Text>

                <Text style={styles.TitleText}>서비스 중단</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨 서비스는 장비의 유지∙보수를 위한 정기 또는 임시 점검 또는 다른 상당한 이유로 글로쿨 서비스의 제공이 일시 중단될 수 있으며, 이때에는 미리 서비스 제공화면에 공지하겠습니다. 만약, 글로쿨로서도 예측할 수 없는 이유로 글로쿨 서비스가 중단된 때에는 글로쿨이 상황을 파악하는 즉시 통지하겠습니다.
                </Text>

                <Text style={styles.TitleText}>이용계약 해지(서비스 탈퇴)</Text>
                <Text style={styles.SubtitleText}>
                    사용자가 글로쿨 서비스의 이용을 더 이상 원치 않는 때에는 언제든지 글로쿨 서비스 내 제공되는 메뉴를 이용하여 글로쿨 서비스 이용계약의 해지 신청을 할 수 있으며, 글로쿨은 법령이 정하는 바에 따라 신속히 처리하겠습니다. 다만, 거래사기 등의 부정이용 방지를 위해 거래를 진행중이거나 거래 관련 분쟁이 발생한 사용자는 이용계약 해지 및 서비스 탈퇴가 특정 기간 동안 제한될 수 있습니다. 이용계약이 해지되면 법령 및 개인정보처리방침에 따라 사용자 정보를 보유하는 경우를 제외하고는 사용자 정보나 사용자가 작성한 게시물 등 모든 데이터는 삭제됩니다. 다만, 사용자가 작성한 게시물이 제3자에 의하여 스크랩 또는 다른 공유 기능으로 게시되거나, 사용자가 제3자의 게시물에 댓글, 채팅 등 게시물을 추가하는 등의 경우에는 다른 이용자의 정상적 서비스 이용을 위하여 필요한 범위 내에서 글로쿨 서비스 내에 삭제되지 않고 남아 있게 됩니다.
                </Text>

                <Text style={styles.TitleText}>책임제한</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 법령상 허용되는 한도 내에서 글로쿨 서비스와 관련하여 본 약관에 명시되지 않은 어떠한 구체적인 사항에 대한 약정이나 보증을 하지 않습니다. 예를 들어, 글로쿨은 글로쿨 서비스에 속한 콘텐츠, 서비스의 특정 기능, 서비스의 이용가능성에 대하여 어떠한 약정이나 보증을 하는 것이 아니며, 글로쿨 서비스를 있는 그대로 제공할 뿐입니다.
                </Text>

                <Text style={styles.TitleText}>손해배상</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨의 과실로 인하여 사용자가 손해를 입게 될 경우 글로쿨은 법령에 따라 사용자의 손해를 배상하겠습니다. 다만, 글로쿨은 글로쿨 서비스에 접속 또는 이용과정에서 발생하는 개인적인 손해, 제3자가 불법적으로 글로쿨의 서버에 접속하거나 서버를 이용함으로써 발생하는 손해, 제3자가 글로쿨 서버에 대한 전송 또는 글로쿨 서버로부터의 전송을 방해함으로써 발생하는 손해, 제3자가 악성 프로그램을 전송 또는 유포함으로써 발생하는 손해, 전송된 데이터의 생략, 누락, 파괴 등으로 발생한 손해, 명예훼손 등 제3자가 글로쿨 서비스를 이용하는 과정에서 사용자에게 발생시킨 손해에 대하여 책임을 부담하지 않습니다. 또한 글로쿨은 법률상 허용되는 한도 내에서 간접 손해, 특별 손해, 결과적 손해, 징계적 손해, 및 징벌적 손해에 대한 책임을 부담하지 않습니다.
                </Text>

                <Text style={styles.TitleText}>약관수정</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 법률이나 글로쿨 서비스의 변경사항을 반영하기 위한 목적 등으로 본 약관이나 각 글로쿨 서비스 고객센터의 글로쿨 서비스 이용방법, 해당 안내 및 고지사항을 수정할 수 있습니다. 본 약관이 변경되는 경우 글로쿨은 변경 사항을 개별 글로쿨 서비스 초기화면에 게시하며, 변경된 약관은 게시한 날로부터 7일 후부터 효력이 발생합니다.{'\n'}
                    글로쿨은 변경된 약관을 게시한 날로부터 효력이 발생되는 날까지 약관변경에 대한 사용자의 의견을 기다리겠습니다. 위 기간이 지나도록 사용자의 의견이 글로쿨에 접수되지 않으면, 사용자가 변경된 약관에 따라 서비스를 이용하는 데에 동의하는 것으로 보겠습니다. 사용자가 변경된 약관에 동의하지 않는 경우 변경된 약관의 적용을 받는 해당 서비스의 제공이 더 이상 불가능하게 됩니다.
                </Text>

                <Text style={styles.TitleText}>사용자 의견</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 사용자의 의견을 소중하게 생각합니다. 사용자는 언제든지 서비스 내 글로쿨 운영자 문의란을 통해 의견을 개진할 수 있습니다. 글로쿨은 푸시 알림, 채팅 방법, 휴대폰 번호 등으로 사용자에게 여러 가지 소식을 알려드리며, 사용자 전체에 대한 통지는 글로쿨 서비스 초기화면 또는 공지사항 란에 게시함으로써 효력이 발생합니다.{'\n'}
                    본 약관은 글로쿨와 사용자와의 관계에 적용되며, 제3자의 수익권을 발생시키지 않습니다.{'\n'}
                    사용자가 본 약관을 준수하지 않은 경우에, 글로쿨이 즉시 조치를 취하지 않더라도 글로쿨이 가지고 있는 권리를 포기하는 것이 아니며, 본 약관 중 일부 조항의 집행이 불가능하게 되더라도 다른 조항에는 영향을 미치지 않습니다.
                </Text>

                <Layout style={styles.Footer}>
                    <Text style={styles.FooterText}>본 약관 또는 글로쿨 서비스와 관련하여서는{'\n'}대한민국의 법률이 적용됩니다.{'\n'}</Text>
                    <Text style={styles.FooterText}>공고일자 2021년 11월 12일</Text>
                    <Text style={styles.FooterText}>시행일자 2021년 11월 12일</Text>
                    <Layout style={{ height: windowHeight * 0.1 }} />
                </Layout>

            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    ScrollViewContainer: {
        paddingHorizontal: windowWidth * 0.05,
    },
    TitleText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
        color: '#7777ff',
        marginTop: 25,
        marginBottom: 5,
    },
    SubtitleText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        color: '#444',
        marginBottom: 10,
        lineHeight: 20,
    },
    SmallText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        color: '#777'
    },
    Footer: {
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center',
    },
    FooterText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        textAlign: 'center',
    }
});