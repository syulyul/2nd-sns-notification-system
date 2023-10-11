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

export const following = (userNo) => {
  return springClient.get(`/myPage/${userNo}/following`);
};

export const follower = (userNo) => {
  return springClient.get(`/myPage/${userNo}/followers`);
};
