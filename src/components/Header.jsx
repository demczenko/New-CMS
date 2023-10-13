import { Controller, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useHeader, useMain, useTab } from "../hooks";
import { v4 as uuidv4 } from "uuid";
import { List, SelectComponent } from ".";
import { Input } from "./ui/input";

const Header = ({
  isFormOpen,
  isTabFormOpen,
  setFormClose,
  setIsTabFormClose,
}) => {
  const [headers, setHtml] = useHeader();
  const handleForm = ({ html, header_name }) => {
    const newHeader = {
      id: uuidv4(),
      isSelected: false,
      html: html,
      value: header_name,
    };
    setHtml((prev) => [...prev, newHeader]);
    setFormClose();
  };

  const handleAddTabValueForm = (tab_id) => {
    console.log(tab_id);
    setFormClose();
    setIsTabFormClose();
  };

  const handleDelete = () => {};
  return (
    <div>
      {isFormOpen && <HeaderForm handleForm={handleForm} />}
      {isTabFormOpen && <TabHeaderForm handleForm={handleAddTabValueForm} />}
      <List
        handleDelete={handleDelete}
        items={headers}
        title="Header templates"
        subtitle={"Manage created header templates."}
      />
    </div>
  );
};

const HeaderForm = ({ handleForm }) => {
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
        <div className="col-span-1">
          <Input
            placeholder="Enter header name..."
            {...register("header_name", {
              required: {
                value: true,
                message: "Header name is required.",
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
          {errors.header_name && (
            <span className="text-red-300 text-sm">
              {errors.header_name.message}
            </span>
          )}
        </div>
        <Textarea
          rows={30}
          placeholder="Enter header html template..."
          className="max-h-[800px] col-span-2"
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
          <span className="text-red-300 text-sm">{errors.html.message}</span>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const TabHeaderForm = ({ handleForm }) => {
  const [tabs, setTabs] = useTab();
  const [mains, setMains] = useMain();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ tab_id, main_id }) => {
    handleForm(tab_id, main_id);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="md:col-span-1 col-span-2">
          <Controller
            control={control}
            name="tab_id"
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  
                  placeholder={"Select tab..."}
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
        <div className="md:col-span-1 col-span-2">
          <Controller
            control={control}
            name="main_id"
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  placeholder={"Select main template..."}
                  items={mains}
                />
              );
            }}
          />
          {errors.main_id && (
            <span className="text-red-300 text-sm">
              {errors.main_id.message}
            </span>
          )}
        </div>
        <Button className="md:col-span-2 col-span-4 md:mt-0 mt-2" type="submit">Save</Button>
      </div>
    </form>
  );
};

export default Header;
