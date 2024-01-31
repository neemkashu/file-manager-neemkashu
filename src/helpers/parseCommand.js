export const parseCommand = (line) => {
  const match = String(line).match(/\S+/);
  return match ? match[0] : "";
};
