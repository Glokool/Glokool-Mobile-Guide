export { TourCompleteList } from './Tour.Complete.component';
export { TourScheduleList } from './Tour.Schedule.component';
export { TourCompleteModal } from './Modal/Tour.Complete.Modal.component';
export { TourScheduleModal } from './Modal/Tour.Schedule.Modal.component';

export interface TourItem {
    _id : string;
    travelDate : string;
    userCount : number;
    zone : string;
    maxUserNum : number;
}