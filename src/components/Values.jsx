import { v4 as uuidv4 } from "uuid";
import { useValue } from "../hooks/useValue";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { List, SelectComponent } from ".";
import { useTab } from "../hooks/useTab";
import { useTitle } from "../hooks/useTitle";
import { Input } from "./ui/input";
import FieldDescription from "./ui/FieldDescription";

const ValueContent = ({ isFormOpen, setFormClose }) => {
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();
  const [titles, setTitles] = useTitle();

  const handleForm = ({ value_data, value_name, value_type }) => {
    const newValue = {
      id: uuidv4(),
      type: "value",
      dataType: value_type,
      isSelected: false,
      value: value_name,
      data: value_data.split("\n"),
    };
    setValues((prev) => [...prev, newValue]);
    setFormClose();
  };

  const isTitleIdTakenToManyTabs = (titleId) => {
    const tabsId = [];
    tabs.forEach((item) => {
      if (item.data.length) {
        tabsId.push(item.data.find((elem) => elem.titleId === titleId));
      }
    });

    if (tabsId.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteValue = (id) => {
    let titleId;
    for (const tab of tabs) {
      if (tab.data.length) {
        let result = tab.data.find((item) => item.valueId === id);
        if (result) {
          titleId = result.titleId;
        }
      }
    }

    setValues((prev) => prev.filter((elem) => elem.id !== id));
    setTabs((prev) =>
      prev.map((item) => {
        if (item.data.length) {
          return {
            ...item,
            data: item.data.filter((elem) => elem.valueId !== id),
          };
        }
        return item;
      })
    );

    if (isTitleIdTakenToManyTabs(titleId)) {
      return;
    } else {
      setTitles((prev) => {
        return prev.map((item) => {
          if (item.id === titleId) {
            return {
              ...item,
              isSelected: false,
              isSelectedOnEveryTab: false,
            };
          }
          return item;
        });
      });
      titleId = "";
    }
  };

  return (
    <div>
      {isFormOpen && <ValueForm handleForm={handleForm} />}
      <List
        handleDelete={handleDeleteValue}
        items={values}
        title="Values"
        subtitle={"Manage created values."}
      />
    </div>
  );
};
let expression =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
let regex = new RegExp(expression);

const ValueForm = ({ handleForm }) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { value_type, value_data } = data;
    if (value_type === "src") {
      if (value_data.match(regex)) {
        handleForm(data);
      } else {
        setError("value_data", {
          message: `${value_type} type you selected doens't fit to content.`,
        });
      }
    }

    if (value_type === "href") {
      if (value_data.match(regex)) {
        handleForm(data);
      } else {
        setError("value_data", {
          message: `${value_type} type you selected doens't fit to content.`,
        });
      }
    }

    if (value_type === "text") {
      handleForm(data);
      // setError("value_data", {
      //   message: `${value_type} type you selected doens't fit to content.`,
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="col-span-2 md:col-span-1">
          <Input
            placeholder="Enter value name..."
            {...register("value_name", {
              required: {
                value: true,
                message: "Value name is required.",
              },
              maxLength: {
                value: 10,
                message: "Maximum length is 10 symbols",
              },
              minLength: {
                value: 2,
                message: "Minimum length is 2 symbols",
              },
            })}
          />
          {errors.value_name && (
            <span className="text-red-300 text-sm">
              {errors.value_name.message}
            </span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please select type of value",
              },
            }}
            name="value_type"
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  className="col-span-1"
                  placeholder={"Select type..."}
                  items={[
                    {
                      id: "href",
                      value: "href",
                    },
                    {
                      id: "src",
                      value: "src",
                    },
                    {
                      id: "text",
                      value: "text",
                    },
                  ]}
                />
              );
            }}
          />
          {errors.value_type && (
            <span className="text-red-300 text-sm">
              {errors.value_type.message}
            </span>
          )}
          <FieldDescription description={"Selected type have impact to what data you can change on HTML template."} />
        </div>
        <div className="col-span-4 mt-2 md:mt-0 md:col-span-2">
          <Textarea
            rows={6}
            placeholder="Enter values..."
            className="max-h-[260px]"
            {...register("value_data", {
              required: {
                value: true,
                message: "Value is required.",
              },
              minLength: {
                value: 2,
                message: "Minimum length is 2 symbols",
              },
            })}
          />
          {errors.value_data && (
            <span className="text-red-300 text-sm">
              {errors.value_data.message}
            </span>
          )}
        </div>
        <Button className="md:mt-0 mt-2" type="submit">Save</Button>
      </div>
    </form>
  );
};
export default ValueContent;
