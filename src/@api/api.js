import axios from 'axios';

const getPhotoList = async (page, per, labelTypeId) => {
    const searchLabel = {
        labelTypeIds:labelTypeId
    };
    console.log('https://tester-api.nearthlab.com/v1/photos?'+'page='+String(page)+'&per='+String(per),{params:searchLabel});
    const response = await axios.get(
      'https://tester-api.nearthlab.com/v1/photos?'+'page='+String(page)+'&per='+String(per),{params:searchLabel}
    );
    console.log(response.data.photos)
    return response.data;
};
const getLabelList = async () => {
  const response = await axios.get(
    'https://tester-api.nearthlab.com/v1/labelTypes',
  );
  console.log(response.data,typeof(response.data))
  return response.data;
};

  const getApi = {
    getPhotoList,
    getLabelList,

  };
  
  export default getApi;