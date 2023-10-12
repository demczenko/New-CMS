import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import { SelectComponent } from ".";
import { useValue } from "../hooks/useValue";
import { useTitle } from "../hooks/useTitle";

const TabContent = () => {
  const handleForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <AddTabForm handleForm={handleForm} />
    </div>
  );
};

const AddTabForm = ({ handleForm }) => {
  const [values, setValues] = useValue()
  const [titles, setTitles] = useTitle()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleForm(data);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div>
          <Controller
            control={control}
            rules={{
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
            }}
            name="tab_name"
            className="col-span-1"
            render={({ field }) => <Input {...field} />}
            placeholder="Enter tab name..."
          />
          {errors.tab_name && (
            <span className="text-red-300 text-sm">
              {errors.tab_name.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="tab_name"
            className="col-span-1"
            rules={{
              required: {
                message: "Please, select title.",
                value: true,
              }
            }}
            placeholder="Select title"
            render={({ field }) => <SelectComponent {...field} placeholder={"Select title"} items={titles} />}
          />
        </div>
        <Controller
            control={control}
            name="tab_name"
            className="col-span-1"
            rules={{
              required: {
                message: "Please, select value.",
                value: true,
              }
            }}
            placeholder="Select value"
            render={({ field }) => <SelectComponent {...field} placeholder={"Select title"} items={values} />}
          />
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TabContent;
