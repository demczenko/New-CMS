import { useFooter, useMain, useTab } from "../hooks";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { List, SelectComponent } from ".";
import { Input } from "./ui/input";
import { v4 as uuidv4 } from "uuid";

const Footer = ({
  isFormOpen,
  isTabFormOpen,
  setFormClose,
  setIsTabFormClose,
}) => {
  const [footers, setHtml] = useFooter();
  const handleForm = ({ html, footer_name }) => {
    const newFooter = {
      id: uuidv4(),
      isSelected: false,
      html: html,
      value: footer_name,
    };
    setHtml((prev) => [...prev, newFooter]);
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
      {isFormOpen && <FooterForm handleForm={handleForm} />}
      {isTabFormOpen && <TabFooterForm handleForm={handleAddTabValueForm} />}
      <List
        handleDelete={handleDelete}
        items={footers}
        title="Footer templates"
        subtitle={"Manage created footers templates."}
      />
    </div>
  );
};

const FooterForm = ({ handleForm }) => {
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
            placeholder="Enter footer name..."
            {...register("footer_name", {
              required: {
                value: true,
                message: "Footer name is required.",
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
          {errors.footer_name && (
            <span className="text-red-300 text-sm">
              {errors.footer_name.message}
            </span>
          )}
        </div>
        <Textarea
          rows={30}
          placeholder="Enter footer html template..."
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

const TabFooterForm = ({ handleForm }) => {
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
        <Button className="md:col-span-2 col-span-4 md:mt-0 mt-2">Save</Button>
      </div>
    </form>
  );
};

export default Footer;
