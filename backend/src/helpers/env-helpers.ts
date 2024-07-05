import dotenv from "dotenv";
dotenv.config();

/**
 * Get the values of env using the key
 *
 * @param name Key of the env where in the needed value is associated
 * @param defaultValue If the env has invalid value or not present this will be the default value
 * @returns
 */
export const getEnvOrDefault = <ElementType>(
  name: string,
  defaultValue: ElementType
) => {
  const envValue = process.env[name];
  return envValue !== undefined ? (envValue as ElementType) : defaultValue;
};
