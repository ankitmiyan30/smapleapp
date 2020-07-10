import { AsyncStorage} from 'react-native';

export function saveImageList(imageList) {
  AsyncStorage.setItem('categoryQuestionList', JSON.stringify(imageList), (err) => {
    if (err) {
      console.log("an error");
      throw err;
    }
    console.log("success");
  }).catch((err) => {
    console.log("error is: " + err);
  });
}

