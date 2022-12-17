import axios from "axios";
import { getAuth } from "firebase/auth";
import { isEmpty } from "lodash";
import qs from "qs";
import { useCommon } from "store/useCommon";

export const api = {
  get: async <T>(url: string, params?: object) => {
    useCommon.setState({ isLoading: true });

    const auth = getAuth();

    let newUrl = isEmpty(params) ? url : `${url}?${qs.stringify(params)}`;

    const headers = {
      headers: {
        id: auth.currentUser?.uid ?? "",
        email: auth.currentUser?.email ?? ""
      }
    };

    try {
      const r = await axios.get<T>(newUrl, headers);
      return Promise.resolve(r);
    } catch (e) {
      alert((e as any).response?.data.error ?? (e as any).message);
      return Promise.reject();
    } finally {
      useCommon.setState({ isLoading: false });
    }
  },
  put: async <T>(url: string, data?: object) => {
    useCommon.setState({ isLoading: true });

    const auth = getAuth();

    const headers = {
      headers: {
        id: auth.currentUser?.uid ?? "",
        email: auth.currentUser?.email ?? ""
      }
    };

    try {
      const r = await axios.put<T>(url, data, headers);
      return Promise.resolve(r);
    } catch (e) {
      alert((e as any).response?.data.error ?? (e as any).message);
      return Promise.reject();
    } finally {
      useCommon.setState({ isLoading: false });
    }
  },
  post: async <T>(url: string, data?: object) => {
    useCommon.setState({ isLoading: true });

    const auth = getAuth();

    const headers = {
      headers: {
        id: auth.currentUser?.uid ?? "",
        email: auth.currentUser?.email ?? ""
      }
    };

    try {
      const r = await axios.post<T>(url, data, headers);
      return Promise.resolve(r);
    } catch (e) {
      alert((e as any).response?.data.error ?? (e as any).message);
      return Promise.reject();
    } finally {
      useCommon.setState({ isLoading: false });
    }
  }
};
