import { MenuIcon } from "lucide-react";
import { Heading } from ".";
import { useTab, useTitle, useValue } from "../hooks";
import { ListValues } from "./ListItems";
import { useRenderArea } from "./RenderArea";

const RightBar = () => {
  const {
    values: { selectedTabAndMainId, isOpen },
    functions: { setselectedTabAndMainId, setIsOpen, setSelectedData },
  } = useRenderArea();
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();
  const [titles, setTitles] = useTitle();

  let selectedTab;
  if (selectedTabAndMainId.hasOwnProperty("tab_id")) {
    selectedTab = tabs.find((tab) => tab.id === selectedTabAndMainId.tab_id);
  }

  const handleMenuClose = () => {
    setIsOpen(false);
  };
  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  if (selectedTab === undefined) {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <div className="py-4">
          <MenuIcon
            className="z-50 relative cursor-pointer"
            onClick={handleMenuOpen}
          />
        </div>
      )}
      {isOpen && (
        <div className="col-span-full md:col-span-3 py-4 xl:block hidden">
          <div className="container h-full mx-auto px-4">
            <div className="relative h-full">
              <div className="flex justify-between items-center mb-6">
                <Heading title={"Select values"} />
                <MenuIcon
                  onClick={handleMenuClose}
                  className="cursor-pointer"
                />
              </div>
              {!selectedTabAndMainId.hasOwnProperty("tab_id") && (
                <p className="text-base text-neutral-300 font-semibold -z-10 flex items-center justify-center inset-0 absolute">
                  Please select node...
                </p>
              )}
              <hr className="my-4" />
              <div className="sticky top-3">
                {selectedTab.data.map((item) => {
                  const getTitleById = () => {
                    return titles.find((title) => title.id === item.titleId);
                  };

                  const getValueById = () => {
                    return values.find((value) => value.id === item.valueId);
                  };

                  return (
                    <div key={item.id}>
                      <h3 className="text-2xl font-medium">
                        {getTitleById().value}
                      </h3>
                      <ListValues
                        setSelectedData={setSelectedData}
                        item={getValueById()}
                        titleId={getTitleById().id}
                        render={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="col-span-full md:col-span-3 py-4 xl:hidden block absolute bg-white/60 backdrop-blur-sm inset-0">
          <div className="container h-full mx-auto px-4">
            <div className="relative h-full">
              <div className="flex justify-between items-center mb-6">
                <Heading title={"Select values"} />
                <MenuIcon
                  onClick={handleMenuClose}
                  className="cursor-pointer"
                />
              </div>
              {!selectedTabAndMainId.hasOwnProperty("tab_id") && (
                <p className="text-base text-neutral-300 font-semibold -z-10 flex items-center justify-center inset-0 absolute">
                  Please select node...
                </p>
              )}
              <hr className="my-4" />
              <div className="sticky top-3">
                {selectedTab.data.map((item) => {
                  const getTitleById = () => {
                    return titles.find((title) => title.id === item.titleId);
                  };

                  const getValueById = () => {
                    return values.find((value) => value.id === item.valueId);
                  };

                  return (
                    <div key={item.id}>
                      <h3 className="text-2xl font-medium">
                        {getTitleById().value}
                      </h3>
                      <ListValues
                        setSelectedData={setSelectedData}
                        item={getValueById()}
                        titleId={getTitleById().id}
                        render={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightBar;
