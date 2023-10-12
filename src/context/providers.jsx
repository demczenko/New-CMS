import { CssContextProvider } from "./cssProvider";
import { FooterContextProvider } from "./footerProvider";
import { HeaderContextProvider } from "./headerProvider";
import { MainContextProvider } from "./mainProvider";
import { TabContextProvider } from "./tabProvider";
import { TitleContextProvider } from "./titleProvider";
import { ValueContextProvider } from "./valueProvider";

export const Providers = ({ children }) => {
  return (
    <TabContextProvider>
      <TitleContextProvider>
        <ValueContextProvider>
          <MainContextProvider>
            <HeaderContextProvider>
              <FooterContextProvider>
                <CssContextProvider>{children}</CssContextProvider>
              </FooterContextProvider>
            </HeaderContextProvider>
          </MainContextProvider>
        </ValueContextProvider>
      </TitleContextProvider>
    </TabContextProvider>
  );
};
