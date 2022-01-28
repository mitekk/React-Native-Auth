import {useEffect, useState} from 'react';
import {gql, useQuery} from 'urql';
import {ProfileIcon} from '../types/profile/profileIcon.type';

const getIcons_query = gql`
  query Icons {
    icons {
      errors {
        field
        message
      }
      icons {
        name
        type
      }
    }
  }
`;

export const useProfileIcon = () => {
  const [isLoading, setIsloading] = useState(true);
  const [icons, setIcons] = useState<ProfileIcon[]>([]);
  const [{data}] = useQuery({query: getIcons_query});

  useEffect(() => {
    const getIcons = async () => {
      const {icons} = data?.icons;
      setIcons(icons);
      setIsloading(false);
    };

    getIcons();
    return () => {
      setIcons([]);
    };
  }, [data]);

  const randomIcon = () =>
    icons && icons[Math.floor(Math.random() * (25 + 1))]?.name;

  return {icons, isLoading, randomIcon};
};
