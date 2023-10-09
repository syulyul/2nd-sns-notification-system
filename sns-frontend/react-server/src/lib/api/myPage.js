import springClient from './springClient';

export const list = (userNo) => springClient.get(`/myPage/${userNo}`);

export const info = (userNo) => springClient.get(`/myPage/${userNo}/info`);

export const update = ({ photo, name, nick, birthDay, email, phoneNumber, password, gender}) =>
    springClient.post('myPage/infoUpdate',
        {
          photo,
          name,
          nick,
          birthDay,
          email,
          phoneNumber,
          password,
          gender,
        });

export const follow = (followingNo) =>
    springClient.get(`/myPage/follow?followingNo=${followingNo}`);

export const unfollow = (followingNo) =>
    springClient.get(`/myPage/unfollow?followingNo=${followingNo}`);