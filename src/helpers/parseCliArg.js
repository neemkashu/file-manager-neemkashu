const parseCliArg = (str) => {
  // handles only one equal sign in the string
  if (!str) return { key: undefined, value: undefined };

  const [key, value] = str.split("=");
  return { key, value };
};

export { parseCliArg };
