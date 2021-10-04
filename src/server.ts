let serverAPI;
let cdnURL;

if (process.env.NODE_ENV === "development"){
    serverAPI = 'https://glokool-guide.com';
    cdnURL = 'https://img.glokool-guide.com';
} else {
    serverAPI = 'https://glokool.info';
    cdnURL = 'https://img.glokool.com';
}

export const SERVER = serverAPI;
export const CDN = cdnURL;