import { TabContextProvider } from "./tabProvider";
import { TitleContextProvider } from "./titleProvider";
import { ValueContextProvider } from "./valueProvider";

export const Providers = ({ children }) => {
  return (
    <TabContextProvider>
      <TitleContextProvider>
        <ValueContextProvider>{children}</ValueContextProvider>
      </TitleContextProvider>
    </TabContextProvider>
  );
};
