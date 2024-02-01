export const checkValidInput = (config, command, argInputAmount) => {
  const isCommandExist = command && Object.keys(config).includes(command);

  const isValid =
    isCommandExist && config[command].argsAmount === argInputAmount;

  return isValid;
};
