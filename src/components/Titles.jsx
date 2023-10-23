import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { useTitle } from "../hooks/useTitle";
import { v4 as uuidv4 } from "uuid";
import { List, SelectComponent } from ".";
import { useTab } from "../hooks/useTab";
import { useValue } from "../hooks/useValue";
import FieldDescription from "./ui/FieldDescription";

const TitleContent = ({ isFormOpen, setFormClose }) => {
  const [titles, setTitles] = useTitle();
  const [tabs, setTabs] = useTab();
  const [values, setValues] = useValue();

  const handleForm = ({ title_name, value_type }) => {
    const newTitle = {
      id: uuidv4(),
      type: "title",
      dataType: value_type,
      isSelectedOnEveryTab: false,
      isSelected: false,
      value: title_name,
    };
    setTitles((prev) => [...prev, newTitle]);
    setFormClose();
  };
  const handleDelete = (id) => {
    let valuesId = [];
    for (const tab of tabs) {
      if (tab.data.length) {
        let result = tab.data.find((item) => item.titleId === id);
        if (result) {
          valuesId.push(result.valueId);
        }
      }
    }
    setTitles((prev) => prev.filter((elem) => elem.id !== id));
    setTabs((prev) =>
      prev.map((item) => {
        if (item.data.length) {
          return {
            ...item,
            data: item.data.filter((elem) => elem.titleId !== id),
          };
        }
        return item;
      })
    );
    setValues((prev) => {
      return prev.map((item) => {
        if (valuesId.includes(item.id)) {
          return {
            ...item,
            isSelected: false,
          };
        }
        return item;
      });
    });
    valuesId = [];
  };

  return (
    <div>
      {isFormOpen && <TitleForm titles={titles} handleForm={handleForm} />}
      <List
        handleDelete={handleDelete}
        items={titles}
        title="Titles"
        subtitle={"Manage created titles."}
      />
    </div>
  );
};

const TitleForm = ({ titles, handleForm }) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const isTitleTaken = (value) => {
    const isTaken = titles.find((item) => item.value === value);
    if (isTaken !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = (data) => {
    if (isTitleTaken(data.title_name)) {
      setError("title_name", {
        message: "Title already exist.",
      });
    } else {
      handleForm(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="col-span-2 md:col-span-1">
          <Input
            placeholder="Enter title name..."
            {...register("title_name", {
              required: {
                value: true,
                message: "Title name is required.",
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
          {errors.title_name && (
            <span className="text-red-300 text-xs">
              {errors.title_name.message}
            </span>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please select type of title",
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
          <div className="flex justify-between">
            {errors.value_type && (
              <span className="text-red-300 text-xs">
                {errors.value_type.message}
              </span>
            )}
            <FieldDescription
              description={
                "Selected type affects on data change on HTML template."
              }
            />
          </div>
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
export default TitleContent;
