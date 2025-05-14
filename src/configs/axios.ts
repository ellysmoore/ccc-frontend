'use client';

import axios, { AxiosResponse, AxiosError } from 'axios';
import { getCookie, removeCookie } from '@/utils/cookie';

const shownErrors = new Map<string, NodeJS.Timeout>();

const AXIOS = axios.create();

// INTERCEPT ALL REQUESTS
AXIOS.interceptors.request.use(
  async (request) => {
    const token = getCookie('access_token');

    if (!request.headers?.authorization && token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error: AxiosError) => {
    console.warn('REQUEST ERROR>>>', error?.response?.data);
    return Promise.reject(error);
  }
);

// INTERCEPT ALL RESPONSES
AXIOS.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response && response.status) {
      return response;
    }
    return Promise.reject(new Error('Response is undefined or missing status'));
  },
  async (error) => {
    const errorMessage = Array.isArray(error?.response?.data?.message)
      ? error?.response?.data?.message[0]
      : error?.response?.data?.message || error?.response?.message || 'An unknown error occurred';

    const errorKey = `${error?.response?.status}-${errorMessage}`;

    if (!error?.response?.status) {
      handleError('network-error', 'Network error. Please try again later');
    } else {
      // HANDLE SPECIFIC ERRORS BASED ON RESPONSE STATUS
      switch (error?.response?.status) {
        case 401:
          removeCookie('access_token');
          window.location.replace('/');
          break;
        default:
          handleError(errorKey, errorMessage);
          break;
      }
    }

    return Promise.reject(error);
  }
);

const handleError = (errorKey: string, message: string) => {
  if (!shownErrors.has(errorKey)) {
    const timeout = setTimeout(() => {
      shownErrors.delete(errorKey);
    }, 5000);

    shownErrors.set(errorKey, timeout);
    return { message };
  }
};

export { AXIOS };