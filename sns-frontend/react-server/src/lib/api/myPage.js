import springClient from './springClient';

export const list = (userNo) => {
  return springClient.get(`/myPage/${userNo}`);
};

export const info = (userNo) => springClient.get(`/myPage/${userNo}/info`);

export const update = ({ userNo, photo, name, nick, birthday, email, phoneNumber, password, gender}) =>
    springClient.post(`/myPage/${userNo}/update`,
        {
          userNo,
          photo,
          name,
          nick,
          birthday,
          email,
          phoneNumber,
          password,
          gender,
        });
export const follow = (followingNo) =>
    springClient.get(`/myPage/follow?followingNo=${followingNo}`);

export const unfollow = ({followingNo}) => {
  return springClient.get(`/myPage/unfollow?followingNo=${followingNo}`);
};