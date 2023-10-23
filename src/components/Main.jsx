import { Controller, useForm } from "react-hook-form";
import { useMain, useTab } from "../hooks";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { List, SelectComponent } from ".";
import { Input } from "./ui/input";
import { v4 as uuidv4 } from "uuid";

const Main = ({
  isFormOpen,
  isTabFormOpen,
  setFormClose,
  setIsTabFormClose,
}) => {
  const [mains, setHtml] = useMain();
  const handleForm = ({ html, main_name }) => {
    const newMain = {
      id: uuidv4(),
      html: html,
      value: main_name,
    };
    setHtml((prev) => [...prev, newMain]);
    setFormClose();
  };

  const handleAddTabValueForm = (tab_id) => {
    setFormClose();
    setIsTabFormClose();
  };

  const handleDelete = (main_id) => {
    setHtml((prev) => prev.filter((item) => item.id !== main_id))
  };

  return (
    <div>
      {isFormOpen && <MainForm handleForm={handleForm} />}
      {isTabFormOpen && <TabMainForm handleForm={handleAddTabValueForm} />}
      <List
        handleDelete={handleDelete}
        items={mains}
        title="Main templates"
        subtitle={"Manage created main templates."}
      />
    </div>
  );
};

const MainForm = ({ handleForm }) => {
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
        <div className="md:col-span-1 col-span-4 mb-2 md:mb-0">
          <Input
            placeholder="Enter main template name..."
            {...register("main_name", {
              required: {
                value: true,
                message: "Header name is required.",
              },
              maxLength: {
                value: 16,
                message: "Maximum length is 16 symbols",
              },
              minLength: {
                value: 2,
                message: "Minimum length is 2 symbols",
              },
            })}
          />
          {errors.main_name && (
            <span className="text-red-300 text-xs">
              {errors.main_name.message}
            </span>
          )}
        </div>
        <Textarea
          rows={30}
          placeholder="Enter main html template..."
          className="max-h-[800px] col-span-4 md:col-span-2 mb-2 md:mb-0"
          {...register("html", {
            required: {
              value: true,
              message: "Value is required.",
            },
            minLength: {
              value: 10,
              message: "Minimum length is 10 symbols",
            },
          })}
        />
        {errors.html && (
          <span className="text-red-300 text-xs">{errors.html.message}</span>
        )}
        <Button className="md:col-span-1 col-span-4" type="submit">Save</Button>
      </div>
    </form>
  );
};

const TabMainForm = ({ handleForm }) => {
  const [tabs, setTabs] = useTab();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ tab_id }) => {
    handleForm(tab_id);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div>
          <Controller
            control={control}
            rules={{
              required: true
            }}
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
            <span className="text-red-300 text-xs">
              {errors.tab_id.message}
            </span>
          )}
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
export default Main;
