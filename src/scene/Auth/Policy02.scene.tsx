import React, { } from 'react';
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { TopTab_GoBack } from '../../component/Common';
import { windowWidth, windowHeight } from '../../Design.component';

export const PolicyScene_02 = () => {

    const policy01 = `•  이용자가 사전에 동의한 경우(이용자가 사전에 동의한 경우란, 서비스 이용 등을 위하여 이용자가 자발적으로 자신의 개인정보를 제3자에게 제공하는 것에 동의하는 것을 의미합니다.)

•  법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
`

    const policy02 = `1. 서비스의 기본 기능이나 특화된 기능을 제공

2. 개별적 공지 필요시

3. 서비스 이용과 관련하여 문의나 분쟁의 해결

4. 유료서비스 이용 시 컨텐츠 등의 전송이나 배송∙요금 정산

5. 서비스 이용

6. 맞춤형 서비스 제공

7. 인구통계학적 특성에 따른 서비스 제공

8. 각종 이벤트나 광고성 정보의 제공

9. 법령 등에 규정된 의무의 이행

10. 법령이나 이용약관에 반하여 여러분에게 피해를 줄 수 있는 잘못된 이용행위의 방지

11. 회원간의 분쟁 조정 

12. 서비스 이용을 위한 이용자 식별(본인 및 성별, 연령확인 포함) 및 부정 이용 방지, 회원 관리 등 서비스 제공
`

    const policy03 = `1. 휴대폰 번호

2. 앱 내 채팅 기능을 사용한 채팅 내용

3. 이용자 이름(닉네임)

4. 이용자의 반려동물 정보(성별, 연령, 사진, 접종여부, 중성화여부)

5. 프로필 사진

6. 성별, 연령

7. 사진(메타정보 포함)

8. 위치정보

9. 단말기 정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키 정보

10. 서비스 이용과정에서 이용자가 작성하는 게시물 기타 콘텐츠 등 정보, 사용하는 기능, 수행하는 행동이나 활동 시간, 빈도 및 기간 등

11. 본인인증 과정에서 본인 확인 기관으로부터 전달받은 생년월일, 성별, 통신사, 휴대전화번호, 암호화된 동일인 식별정보(CI), 중복가입확인정보(DI)와 DI 해시값, 내외국인 정보, 본인인증 이력
`

    const policy04 = `1. 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우

2. 거래 과정에서 이용자가 채팅방에 입력하는 휴대번호, 위치 정보
`

    const policy05 = `•  수탁업체 : Amazon Web Services, Inc.

•  위탁내용 : 정보저장

•  개인정보의 보유 및 이용기간 : 회원탈퇴시 혹은 위탁계약 종료시까지
`

    const policy06 = `•  보존 항목: 부정 이용 기록
•  보존 이유: 부정 이용 방지
•  보존 기간: 10년

•  보존 항목: 판매 게시물 및 채팅 내용
•  보존 이유: 거래 관련 사기 방지 및 분쟁 해결
•  보존 기간: 5년
`

    const policy07 = `•  보존 항목: 계약 또는 청약철회 등에 관한 기록
•  근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률
•  보존 기간: 5년

•  보존 항목: 대금결제 및 재화 등의 공급에 관한 기록
•  근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률
•  보존 기간: 5년

•  보존 항목: 소비자의 불만 또는 분쟁처리에 관한 기록
•  근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률
•  보존 기간: 3년

•  보존 항목: 표시/광고에 관한 기록
•  근거 법령: 전자상거래 등에서의 소비자보호에 관한 법률
•  보존 기간: 6개월

•  보존 항목: 세법이 규정하는 모든 거래에 관한 장부 및 증빙서류
•  근거 법령: 국세기본법
•  보존 기간: 5년

•  보존 항목: 전자금융 거래에 관한 기록
•  근거 법령: 전자금융거래법
•  보존 기간: 5년

•  보존 항목: 서비스 방문기록
•  근거 법령: 통신비밀보호법
•  보존 기간: 3개월
`

    const policy08 = `•  Internet Explorer의 경우 웹 브라우저 상단의 도구 메뉴 > 인터넷 옵션 > 개인정보 > 설정

•  Chrome의 경우 웹 브라우저 우측의 설정 메뉴 > 화면 하단의 고급 설정 표시 > 개인정보의 콘텐츠 설정 버튼 > 쿠키
`

const policy09 =`
•  이름: 정민찬

•  직위: 개인정보보호 책임자

•  부서: 개발팀

•  연락처: minchan@glokool.com
`

    return (
        <Layout style={styles.MainContainer}>
            <TopTab_GoBack title={'개인정보 처리방침'} />

            <ScrollView style={styles.ScrollViewContainer}>

                <Text style={styles.TitleText}>글로쿨 개인정보처리방침</Text>
                <Text style={styles.SubtitleText}>
                    "글로쿨”(이하 “회사”)은 "정보통신망 이용촉진 및 정보보호에 관한 법률", “개인정보보호법”, "통신비밀보호법", "전기통신사업법" 및 “전자상거래 등에서의 소비자 보호에 관한 법률” 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하겠습니다. 회사는 이용자의 개인정보를 [개인정보의 수집목적]에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 제공 또는 위탁하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                </Text>
                <Text style={styles.SmallText}>{policy01}</Text>
                <Text style={styles.SubtitleText}>
                    이러한 경우에도, 회사는 이용자에게 (1) 개인정보를 제공받는 자 (2) 그의 이용목적 (3) 개인정보의 보유 및 이용기간을 사전에 고지하고 이에 대해 명시적·개별적으로 동의를 얻습니다. 이와 같은 모든 과정에 있어서 회사는 이용자의 의사에 반하여 추가적인 정보를 수집하거나, 동의의 범위를 벗어난 정보를 제3자와 공유하지 않습니다.
                </Text>

                <Text style={styles.TitleText}>개인정보 활용처</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 아래와 같은 활용 목적을 가지고 이용자 개인정보를 수집합니다.
                </Text>
                <Text style={styles.SmallText}>{policy02}</Text>

                <Text style={styles.TitleText}>수집하는 개인정보</Text>
                <Text style={styles.SmallText}>{policy03}</Text>

                <Text style={styles.TitleText}>개인정보를 수집하는 방법</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 다음과 같은 방법을 통해 개인정보를 수집합니다.
                </Text>
                <Text style={styles.SmallText}>{policy04}</Text>

                <Text style={styles.TitleText}>서비스 이용 과정에서 이용자로부터 수집하는 개인정보</Text>
                <Text style={styles.SubtitleText}>
                    PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키, 방문일시의 정보가 자동으로 생성되어 수집될 수 있습니다.
                </Text>

                <Text style={styles.TitleText}>개인정보 공유 및 제공</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 이용자가 서비스 이용과정 등에서 따로 동의하는 경우나 법령에 규정된 경우를 제외하고는 이용자 개인정보를 위에서 말씀 드린 목적 범위를 초과하여 이용하거나 제3자에게 제공 또는 공유하지 않습니다.
                </Text>

                <Text style={styles.TitleText}>개인정보 처리 위탁</Text>
                <Text style={styles.SubtitleText}>
                    글로쿨은 서비스의 원활한 제공을 위해 필요한 때에는 개인정보의 처리를 일부 위탁하고 있으며, 수탁 받은 업체가 관계 법령을 준수하도록 관리·감독하고 있습니다.
                </Text>
                <Text style={styles.SmallText}>{policy05}</Text>

                <Text style={styles.TitleText}>개인정보 보유기간, 파기방법 및 이용기간</Text>
                <Text style={styles.SubtitleText}>
                    이용자 개인정보는 이용자로부터 동의를 받은 수집 및 이용목적이 달성된 때에는 회사 내부 방침 또는 관계 법령에서 정한 일정한 기간 동안 보관한 다음 파기합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기하고, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 글로쿨이 내부 방침 또는 법령에 따라 보관하는 개인정보 및 해당 법령은 아래 표와 같습니다. 또한 아래 기준과 별개로 회사는 1년간 서비스를 이용하지 않은 회원의 개인정보를 별도로 분리 보관 또는 삭제하고 있으며, 분리 보관된 개인정보는 4년간 보관 후 지체없이 파기합니다. '이용목적이 달성된 때'란 철회요청, 서비스계약 만료, 탈퇴 시를 의미합니다.
                </Text>

                <Text style={styles.SubtitleText}>
                    가. 회사 내부 방침에 의한 정보보유 사유
                </Text>
                <Text style={styles.SmallText}>{policy06}</Text>

                <Text style={styles.SubtitleText}>
                    나. 관련 법령에 의한 정보보유 사유
                </Text>
                <Text style={styles.SmallText}>{policy07}</Text>

                <Text style={styles.TitleText}>인터넷 접속정보파일 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항</Text>
                <Text style={styles.SubtitleText}>
                    쿠키란?
                </Text>
                <Text style={styles.SmallText}>
                    웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자 컴퓨터에 저장됩니다.
                </Text>

                <Text style={styles.SubtitleText}>
                    사용목적?
                </Text>
                <Text style={styles.SmallText}>
                    개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는 쿠키를 사용합니다. 이용자가 웹사이트에 방문할 경우 웹 사이트 서버는 이용자의 디바이스에 저장되어 있는 쿠키의 내용을 읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공하게 됩니다. 쿠키는 이용자가 웹 사이트를 방문할 때, 웹 사이트 사용을 설정한대로 접속하고 편리하게 사용할 수 있도록 돕습니다. 또한, 이용자의 웹사이트 방문 기록, 이용 형태를 통해서 최적화된 광고 등 맞춤형 정보를 제공하기 위해 활용됩니다.
                </Text>

                <Text style={styles.SubtitleText}>
                    쿠키 수집 거부
                </Text>
                <Text style={styles.SmallText}>
                    쿠키에는 이름, 전화번호 등 개인을 식별하는 정보를 저장하지 않으며, 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 설치를 거부할 경우 웹 사용이 불편해지며, 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.
                </Text>

                <Text style={styles.SubtitleText}>
                    설정 방법의 예
                </Text>
                <Text style={styles.SmallText}>
                    {policy08}
                </Text>

                <Text style={styles.TitleText}>이용자 권리 보호</Text>
                <Text style={styles.SubtitleText}>
                이용자(만 14세 미만인 경우 법정 대리인)는 언제든지 이용자 개인정보를 조회하거나 수정할 수 있으며 수집·이용에 대한 동의 철회 또는 가입 해지를 요청할 수도 있습니다. 보다 구체적으로는 서비스 내 설정 기능을 통한 변경, 가입 해지(동의 철회)를 위해서는 서비스 내 "계정탈퇴"를 클릭하면 되며, 운영자에게 이메일이나 별도 게시판으로 문의할 경우도 지체 없이 조치하겠습니다.
                </Text>

                <Text style={styles.TitleText}>개인정보 문의처</Text>
                <Text style={styles.SubtitleText}>
                사용자가 서비스를 이용하면서 발생하는 모든 개인정보보호 관련 문의, 불만, 조언이나 기타 사항은 개인정보 보호책임자 및 담당부서로 연락해 주시기 바랍니다. 글로쿨은 사용자 목소리에 귀 기울이고 신속하고 충분한 답변을 드릴 수 있도록 최선을 다하겠습니다.
                </Text>

                <Text style={styles.TitleText}>개인정보보호 책임자</Text>
                <Text style={styles.SmallText}>
                    {policy09}
                </Text>

                <Text style={styles.TitleText}>고지의 의무</Text>
                <Text style={styles.SubtitleText}>
                글로쿨은 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보처리방침을 수정할 수 있습니다. 개인정보처리방침이 변경되는 경우 글로쿨은 변경 사항을 게시하며, 변경된 개인정보처리방침은 게시한 날로부터 7일 후부터 효력이 발생합니다.
                </Text>

                <Layout style={styles.Footer}>
                    <Text style={styles.FooterText}>공고일자 2021년 11월 12일</Text>
                    <Text style={styles.FooterText}>시행일자 2021년 11월 19일</Text>
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
    },
    SubtitleText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        color: '#444',
        marginBottom: 10,
        lineHeight: 20,
        marginTop: 10,
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