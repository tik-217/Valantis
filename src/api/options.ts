import md5 from "md5";

const date = new Date().toLocaleDateString().split(".").reverse().join("");

export const url = "https://api.valantis.store:41000/";

export const headers = {
  "X-Auth": md5(`Valantis_${date}`),
  "Content-Type": "application/json",
};

export const method = "POST";
