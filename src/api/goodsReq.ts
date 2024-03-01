import { headers, method, url } from "./options";

export const goodsReq = async (
  action: string,
  params: {
    ids?: string[];
    limit?: number;
    offset?: number;
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
