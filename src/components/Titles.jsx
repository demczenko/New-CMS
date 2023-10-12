import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useTitle } from "../hooks/useTitle";
import { v4 as uuidv4 } from "uuid";
import { List } from ".";
import { useTab } from "../hooks/useTab";
import { useValue } from "../hooks/useValue";

const TitleContent = ({ isFormOpen, setFormClose }) => {
  const [titles, setTitles] = useTitle();
  const [tabs, setTabs] = useTab();
  const [values, setValues] = useValue();

  const handleForm = ({ title_name }) => {
    const newTitle = {
      id: uuidv4(),
      isSelectedOnEveryTab: false,
      isSelected: false,
      value: title_name,
    };
    setTitles((prev) => [...prev, newTitle]);
    setFormClose();
  };
  const handleDelete = (id) => {
    let valuesId = []
    for (const tab of tabs) {
      if (tab.data.length) {
        let result = tab.data.find((item) => item.titleId === id);
        if (result) {
          valuesId.push(result.valueId)
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
    valuesId = []
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
        message: "Title already taken.",
      });
    } else {
      handleForm(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div>
          <Input
            placeholder="Enter title name..."
            className="col-span-1"
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
            <span className="text-red-300 text-sm">
              {errors.title_name.message}
            </span>
          )}
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
export default TitleContent;
