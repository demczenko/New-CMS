import { FooterContextProvider } from "./footerProvider";
import { HeaderContextProvider } from "./headerProvider";
import { MainContextProvider } from "./mainProvider";
import { TabContextProvider } from "./tabProvider";
import { TitleContextProvider } from "./titleProvider";
import { ValueContextProvider } from "./valueProvider";

export const Providers = ({ children }) => {
  return (
    <MainContextProvider>
      <HeaderContextProvider>
        <FooterContextProvider>
          <TabContextProvider>
            <TitleContextProvider>
              <ValueContextProvider>{children}</ValueContextProvider>
            </TitleContextProvider>
          </TabContextProvider>
        </FooterContextProvider>
      </HeaderContextProvider>
    </MainContextProvider>
  );
};
