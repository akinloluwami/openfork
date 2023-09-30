const isProd = process.env.NODE_ENV === "production";

const DOMAIN = isProd ? "https://v2.openfork.dev" : "http://localhost:1800";

export { isProd, DOMAIN };
