import Axios from 'axios';
import Cookies from 'js-cookie';

interface CustomResponse {
  success: boolean;
  message: string;
  data?: any;
}

const axios = Axios.create({
  headers: {
    // 'Content-Type': 'application/json',
    // 'X-Api-Key': process.env.REACT_APP_X_API_KEY ?? '',
    // Authorization: `Bearer ${localStorage?.getItem('accesstoken') ?? 'notoken'}` ,
    // Authorization: `Bearer ${Cookies.get('accesstoken') ?? 'notoken'} `,
  },
});

const getResponse = (response: { body: string }): CustomResponse => {
  const formatted = response?.body ? JSON.parse(response?.body) : response;
  return formatted;
};

export const registerUser = async (body: {
  email: string;
  password: string;
  name: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/createUser`,
      body,
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const logUserIn = async (body: {
  email: string;
  password: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      body,
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendDataToS3 = async (body: {
  file: string;
  key: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sendDataToS3`,
      body,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accesstoken') ?? 'notoken'} `,
        },
      },
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const createMovie = async (body: {
  title: string;
  publishingYear: number;
  poster: string;
  userId: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/createMovie`,
      body,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accesstoken') ?? 'notoken'} `,
        },
      },
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateMovie = async (body: {
  id: string;
  title: string;
  publishingYear: number;
  poster: string;
  userId: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/updateMovie`,
      body,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accesstoken') ?? 'notoken'} `,
        },
      },
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getMovie = async (body: {
  id: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/getMovie`,
      body,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accesstoken') ?? 'notoken'} `,
        },
      },
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserMovies = async (body: {
  userId: string;
}): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/getAllUserMovies`,
      body,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accesstoken') ?? 'notoken'} `,
        },
      },
    );
    return getResponse(responseData);
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
