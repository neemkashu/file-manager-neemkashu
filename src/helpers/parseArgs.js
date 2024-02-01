export const parseArgs = (line) => {
  // easy whitespace separator. no handling for 'file with spaces.txt'

  const tokens = String(line).split(/\s+/);

  if (tokens[0] === "") return [];

  return tokens.slice(1);
};
