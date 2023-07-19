// Constants.js
const prod = {
    URL_ORIGIN: "",
    NODE_ENV: "production"
}

/**
 *
 *
 */
const dev = {
    URL_ORIGIN: "",
    NODE_ENV: "development"
};

// Export either a development or production configuration object.
//
// If the process is started with "npm run start", then the development
// object is returned, other the production object is returned.
//
// For more details see:
// https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
export const config = process.env.NODE_ENV === "development" ? dev : prod;