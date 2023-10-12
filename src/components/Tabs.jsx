import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { List, SelectComponent } from ".";
import { useValue } from "../hooks/useValue";
import { useTitle } from "../hooks/useTitle";
import { useTab } from "../hooks/useTab";
import { v4 as uuidv4 } from "uuid";

const TabContent = ({
  isTabFormOpen,
  isFormOpen,
  setFormClose,
  setIsTabFormClose,
}) => {
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();
  const [titles, setTitles] = useTitle();

  const handleAddTabForm = (tab_name) => {
    const newTab = {
      id: uuidv4(),
      value: tab_name,
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
    markTitleAsUsed(titleId)
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
    setFormClose();
    setIsTabFormClose();
  };

  return (
    <div>
      {isFormOpen && <TabForm tabs={tabs} handleForm={handleAddTabForm} />}
      {isTabFormOpen && <TabValueForm handleForm={handleAddTabValueForm} />}
      <List items={tabs} title="Tabs" subtitle={"Manage created tabs."} />
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
        <div>
          <Input
            placeholder="Enter tab name..."
            className="col-span-1"
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
    formState: { errors },
  } = useForm();
  const onSubmit = ({ tab_id, titleId, valueId }) => {
    handleForm(tab_id, titleId, valueId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div>
          <Controller
            control={control}
            name="tab_id"
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
        <div>
          <Controller
            control={control}
            name="titleId"
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
          {errors.title_name && (
            <span className="text-red-300 text-sm">
              {errors.title_name.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            control={control}
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
          {errors.value_name && (
            <span className="text-red-300 text-sm">
              {errors.value_name.message}
            </span>
          )}
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TabContent;
