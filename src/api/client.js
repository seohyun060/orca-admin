const client = () => {
  if (process.env.NODE_ENV === "development") {
    console.log("localhost");
    return ""
  } else {
    console.log("development");
    return process.env.REACT_APP_BACKEND_ADRESS
  }
};

export default client;
