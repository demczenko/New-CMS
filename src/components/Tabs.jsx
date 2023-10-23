import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { List, SelectComponent } from ".";
import { useValue } from "../hooks/useValue";
import { useTitle } from "../hooks/useTitle";
import { useTab } from "../hooks/useTab";
import { v4 as uuidv4 } from "uuid";
import { useFooter, useHeader } from "../hooks";

const TabContent = ({
  isTabFormOpen,
  isFormOpen,
  setFormClose,
  setIsTabFormClose,
}) => {
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();
  const [titles, setTitles] = useTitle();

  const [headers, setHeader] = useHeader();
  const [footers, setFooter] = useFooter();

  const isTitleIdTakenToManyTabs = (titleId) => {
    const tabsId = [];
    tabs.forEach((item) => {
      if (item.data.length) {
        tabsId.push(item.data.find((elem) => elem.titleId === titleId));
      }
    });
    if (tabsId.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddTabForm = (tab_name) => {
    const newTab = {
      id: uuidv4(),
      value: tab_name,
      type: 'tab',
      isSelected: false,
      header_id: "",
      footer_id: "",
      data: [],
    };

    setTabs((prev) => [...prev, newTab]);
    setFormClose();
  };

  const markValueAsUsed = (valueId) => {
    setValues((prev) => {
      return prev.map((value) => {
        if (value.id === valueId) {
          return {
            ...value,
            isSelected: true,
          };
        }
        return value;
      });
    });
  };

  const markTitleAsUsed = (titleId) => {
    setTitles((prev) => {
      return prev.map((value) => {
        if (value.id === titleId) {
          return {
            ...value,
            isSelected: true,
          };
        }
        return value;
      });
    });
  };

  const handleAddTabValueForm = (tab_id, titleId, valueId) => {
    markValueAsUsed(valueId);
    markTitleAsUsed(titleId);
    setTabs((prev) => {
      return prev.map((item) => {
        if (item.id === tab_id) {
          return {
            ...item,
            data: [
              ...item.data,
              {
                titleId,
                valueId,
              },
            ],
          };
        }
        return item;
      });
    });
    if (isTitleIdTakenToManyTabs(titleId)) {
      setTitles((prev) => {
        return prev.map((item) => {
          if (item.id === titleId) {
            return {
              ...item,
              isSelectedOnEveryTab: true,
            };
          }
          return item;
        });
      });
    }
    setFormClose();
    setIsTabFormClose();
  };

  const markFooterAsUnUsed = (footer_id) => {
    setFooter((prev) => {
      return prev.map((value) => {
        if (value.id === footer_id) {
          return {
            ...value,
            isSelected: false,
          };
        }
        return value;
      });
    });
  };

  const markHeaderAsUnUsed = (header_id) => {
    setHeader((prev) => {
      return prev.map((value) => {
        if (value.id === header_id) {
          return {
            ...value,
            isSelected: false,
          };
        }
        return value;
      });
    });
  };

  const handleTabDelete = (id) => {
    const tab = tabs.find(tab => tab.id === id);
    if (tab.data.length) {
      const valuesIds = []
      const titleIds = []
      for (const t of tab.data) {
        valuesIds.push(t.valueId)
        titleIds.push(t.titleId)
      }
      titleIds.forEach(id => setTitles((prev) => prev.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            isSelected: false,
          }
        }
        return elem
      })))

      valuesIds.forEach(id => setValues((prev) => prev.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            isSelected: false,
          }
        }
        return elem
      })))
    }

    if (tab?.header_id) {
      markHeaderAsUnUsed(tab?.header_id)
    }

    if (tab?.footer_id) {
      markFooterAsUnUsed(tab?.footer_id)
    }
    setTabs((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div>
      {isFormOpen && <TabForm tabs={tabs} handleForm={handleAddTabForm} />}
      {isTabFormOpen && <TabValueForm handleForm={handleAddTabValueForm} />}
      <List items={tabs} title="Tabs" handleDelete={handleTabDelete} subtitle={"Manage created tabs."} />
    </div>
  );
};

const TabForm = ({ handleForm }) => {
  const [tabs, setTabs] = useTab();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const isTabTaken = (value) => {
    const isTaken = tabs.find((item) => item.value === value);
    if (isTaken !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = ({ tab_name }) => {
    if (isTabTaken(tab_name)) {
      setError("tab_name", {
        message: "Tab already taken.",
      });
    } else {
      handleForm(tab_name);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="col-span-3 md:col-span-1">
          <Input
            placeholder="Enter tab name..."
            {...register("tab_name", {
              required: {
                value: true,
                message: "Tab name is required.",
              },
              maxLength: {
                value: 6,
                message: "Maximum length is 6 symbols",
              },
              minLength: {
                value: 2,
                message: "Minimum length is 2 symbols",
              },
            })}
          />
          {errors.tab_name && (
            <span className="text-red-300 text-sm">
              {errors.tab_name.message}
            </span>
          )}
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const TabValueForm = ({ handleForm }) => {
  const [values, setValues] = useValue();
  const [titles, setTitles] = useTitle();
  const [tabs, setTabs] = useTab();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const isTabAlreadyHaveSelectedTitle = (tab_id, titleId) => {
    for (const tab of tabs) {
      if (tab.id === tab_id) {
        if (tab.data.length) {
          let result = tab.data.find((item) => item.titleId === titleId);
          if (result !== undefined) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  };

  const isSelectedValueDataTypeEqualsToSelectedTitleType = (titleId, valueId) => {
    const selectedTitle = titles.find(title => title.id === titleId)
    const selectedValue = values.find(value => value.id === valueId)

    if (selectedTitle.dataType === selectedValue.dataType) {
      return true
    } else {
      return false
    }
  }

  const onSubmit = ({ tab_id, titleId, valueId }) => {
    if (isTabAlreadyHaveSelectedTitle(tab_id, titleId)) {
      setError("titleId", {
        message: "Title already taken by this tab.",
      });
      return
    }

    if (!isSelectedValueDataTypeEqualsToSelectedTitleType(titleId, valueId)) {
      setError("titleId", {
        message: "Selected title data type is not equal to selected value data type",
      });
      setError("valueId", {
        message: "Selected value data type is not equal to selected title data type",
      });
      return
    }

    handleForm(tab_id, titleId, valueId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 mt:gap-x-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <Controller
            control={control}
            name="tab_id"
            rules={{
              required: {
                value: true,
                message: "Please select a tab"
              },
            }}
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  className="col-span-1"
                  placeholder={"Select tab"}
                  items={tabs}
                />
              );
            }}
          />
          {errors.tab_id && (
            <span className="text-red-300 text-sm">
              {errors.tab_id.message}
            </span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <Controller
            control={control}
            name="titleId"
            rules={{
              required: {
                value: true,
                message: "Please select a title"
              },
            }}
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  className="col-span-1"
                  placeholder={"Select title"}
                  items={titles}
                />
              );
            }}
          />
          {errors.titleId && (
            <span className="text-red-300 text-xs">
              {errors.titleId.message}
            </span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please select a value"
              },
            }}
            name="valueId"
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  className="col-span-1"
                  placeholder={"Select value"}
                  items={values.filter((value) => value.isSelected !== true)}
                />
              );
            }}
          />
          {errors.valueId && (
            <span className="text-red-300 text-xs">
              {errors.valueId.message}
            </span>
          )}
        </div>
        <Button className="col-span-2 md:col-span-1" type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TabContent;
