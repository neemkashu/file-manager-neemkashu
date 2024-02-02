export const speakToUser = (userName = "Anonymous", isGoodBye = false) => {
  const message = isGoodBye
    ? `Thank you for using File Manager, ${userName}, goodbye`
    : `Welcome to the File Manager, ${userName}!`;

  console.log(message);
};
