import { Heading } from ".";
import { useTab, useValue } from "../hooks";
import { ListValues } from "./ListItems";
import { useRenderArea } from "./RenderArea";

const RightBar = () => {
  const [selectedTemplate, setSelectedTemplate] = useRenderArea();
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();

  let selectedTab;
  let valueIds;
  let valuesByTab;

  if (selectedTemplate.hasOwnProperty("tab_id")) {
    selectedTab = tabs.find((tab) => tab.id === selectedTemplate.tab_id);
    valueIds = selectedTab.data.map((item) => item.valueId);

    valuesByTab = values.filter((value) => valueIds.includes(value.id));
  }

  return (
    <div className="relative h-full">
      <Heading
        title={"Select values"}
      />
      {!selectedTemplate.hasOwnProperty("tab_id") && (
        <p className="text-base text-neutral-300 font-semibold flex items-center justify-center inset-0 absolute">
          Please select node...
        </p>
      )}
      <hr className="my-6" />
      {valuesByTab !== undefined && (
        <div className="sticky top-3">
          {valuesByTab.map((value) => (
            <ListValues item={value} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightBar;
