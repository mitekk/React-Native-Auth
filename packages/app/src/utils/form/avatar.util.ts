import {AVATAR_ICONS} from '../../mock';

export const avatarUtil = {
  getAvatar: () => AVATAR_ICONS[Math.floor(Math.random() * (25 + 1))]?.name,
};
