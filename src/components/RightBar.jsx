import { MenuIcon } from "lucide-react";
import { Heading } from ".";
import { useTab, useValue } from "../hooks";
import { ListValues } from "./ListItems";
import { useRenderArea } from "./RenderArea";

const RightBar = () => {
  const {
    values: { selectedTabAndMainId, isOpen },
    functions: { setselectedTabAndMainId, setIsOpen },
  } = useRenderArea();
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();

  let selectedTab;
  let valueIds;
  let valuesByTab;

  if (selectedTabAndMainId.hasOwnProperty("tab_id")) {
    selectedTab = tabs.find((tab) => tab.id === selectedTabAndMainId.tab_id);
    valueIds = selectedTab.data.map((item) => item.valueId);

    valuesByTab = values.filter((value) => valueIds.includes(value.id));
  }

  const handleMenuClose = () => {
    setIsOpen(false);
  };
  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <div className="py-4">
          <MenuIcon className="z-50 relative cursor-pointer" onClick={handleMenuOpen} />
        </div>
      )}
      {isOpen && (
        <div className="col-span-full md:col-span-3 py-4">
          <div className="container h-full mx-auto px-4">
            <div className="relative h-full">
              <div className="flex justify-between items-center mb-6">
                <Heading title={"Select values"} />
                <MenuIcon onClick={handleMenuClose} className="cursor-pointer" />
              </div>
              {!selectedTabAndMainId.hasOwnProperty("tab_id") && (
                <p className="text-base text-neutral-300 font-semibold -z-10 flex items-center justify-center inset-0 absolute">
                  Please select node...
                </p>
              )}
              <hr className="my-6" />
              {valuesByTab !== undefined && (
                <div className="sticky top-3">
                  {valuesByTab.map((value, id) => (
                    <ListValues key={id} item={value} render={true} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightBar;
