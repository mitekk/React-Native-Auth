import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export const openImageGallery = () => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };
  return launchImageLibrary(options);
};
