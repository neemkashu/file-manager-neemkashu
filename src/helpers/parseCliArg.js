const parseCliArg = (str) => {
  // handles only one equal sign in the string
  const [key, value] = str.split("=");
  return { key, value };
};

export { parseCliArg };
