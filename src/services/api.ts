import axios from "axios";
import { getAuth } from "firebase/auth";
import { isEmpty } from "lodash";
import qs from "qs";
import store from "store";
import { setLoading } from "store/common";

export const api = {
  get: async <T>(url: string, params?: object) => {
    store.dispatch(setLoading(true));

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
    } finally {
      store.dispatch(setLoading(false));
    }
  }
};
