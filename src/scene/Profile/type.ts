// Profile Navigator 에서 쓰이는 type

// guide info type 에서 rate 랑 report 는 
// 어떤 타입으로 이루어진 array 인지 몰라서 임시로 any 지정해줬습니다
export type GuideInfoType = {
    __v?: any;
    _id?: string;
    avatar?: string;
    birthDate?: string;
    contact?: string;
    country?: string;
    email?: string;
    gender?: string;
    intro?: string;
    keyword?: Array<string>;
    lang?: Array<boolean>;
    name?: string;
    oneLineIntro?: string;
    rate?: Array<any>;
    report?: Array<any>;
    signupDate?: string;
    token?: string;
    uid?: string;
    withdrawal?: boolean;
};

export type ChangeInfo = {
    contact?: string;
    email?: string;
    intro?: string;
    oneLineIntro?: string;
    name?: string;
}