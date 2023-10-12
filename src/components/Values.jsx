import { v4 as uuidv4 } from "uuid";
import { useValue } from "../hooks/useValue";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { List } from ".";
import { useTab } from "../hooks/useTab";

const ValueContent = ({ isFormOpen, setFormClose }) => {
  const [values, setValues] = useValue();
  const [tabs, setTabs] = useTab();

  const handleForm = ({ value_name }) => {
    const newValue = {
      id: uuidv4(),
      isSelected: false,
      value: value_name.split("\n"),
    };
    setValues((prev) => [...prev, newValue]);
    setFormClose();
  };

  const handleDeleteValue = (id) => {
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

const ValueForm = ({ handleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="col-span-3">
          <Textarea
            rows={6}
            placeholder="Enter values..."
            className="max-h-[260px]"
            {...register("value_name", {
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
export default ValueContent;