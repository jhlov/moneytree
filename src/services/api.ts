import axios from "axios";
import { getAuth } from "firebase/auth";
import { isEmpty } from "lodash";
import qs from "qs";

export const api = {
  get: <T>(url: string, params?: object) => {
    const auth = getAuth();

    let newUrl = isEmpty(params) ? url : `${url}?${qs.stringify(params)}`;

    const headers = {
      headers: {
        id: auth.currentUser?.uid ?? "",
        email: auth.currentUser?.email ?? ""
      }
    };

    return axios.get<T>(newUrl, headers);
  }
};
