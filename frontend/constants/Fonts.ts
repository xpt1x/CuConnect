interface DefaultFontConfig {
  regular: {
    fontFamily: string;
    fontWeight: "normal";
  };
  medium: {
    fontFamily: string;
    fontWeight: "normal";
  };
  light: {
    fontFamily: string;
    fontWeight: "normal";
  };
  thin: {
    fontFamily: string;
    fontWeight: "normal";
  };
}

interface FontConfig {
  default: DefaultFontConfig;
  web?: DefaultFontConfig;
  ios?: DefaultFontConfig;
  android?: DefaultFontConfig;
}

export const fontConfig: FontConfig = {
  default: {
    regular: {
      fontFamily: "Poppins_400Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Poppins_500Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Poppins_300Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Poppins_100Thin",
      fontWeight: "normal",
    },
  },
};

fontConfig.web = fontConfig.default;
fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;
