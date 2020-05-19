interface TokenSettingsInterface {
  separator: string;
  expires: string | number | undefined;
}

export const TokenSettings: TokenSettingsInterface = {
  separator: " ",
  expires: "20m",
};
