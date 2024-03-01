import { headers, method, url } from "./options";

export const goodsFilterReq = async (
  action: string,
  params: {
    [key: string]: string | string[] | number | undefined;
  }
) => {
  return await fetch(url, {
    method,
    headers,
    body: JSON.stringify({
      action,
      params: { ...params },
    }),
  });
};
