// Import necessary modules
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { setLoading } from "../store/Redux-Dispatcher/Dispatcher";
import { setNextContext } from "../store/Redux-Dispatcher/ApiDispatcher";

sessionStorage.setItem("ami-userToken", uuidv4());
export const userToken = sessionStorage.getItem("ami-userToken");
let accessToken: string | null = "";

export const registerFlow = async (apiBody: any, nextContext: any) => {
  accessToken = sessionStorage.getItem("ami-accessToken");
  setLoading(true);

  const url = `amiAPI/log/login`;

  const body = {
    context_id: nextContext,
    userToken: userToken,
    data: apiBody,
  };

  return axios
    .post(url, body, {
      headers: {
        token: `${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // if (response.data && response.data.flowComplete) {
      //   // setNextContext(response.data);
      //   setTimeout(() => {
      //     setLoading(false);
      //     setNextContext(response.data);
      //   }, 1500);
      // }

      if (response.data && response.data.next_context.length > 0) {
        // setNextContext(response.data);
        setTimeout(() => {
          setLoading(false);
          setNextContext(response.data);
        }, 1500);
      }
      // setLoading(true);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

window.addEventListener("beforeunload", () => {
  sessionStorage.clear();
});
