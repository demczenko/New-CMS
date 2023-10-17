import React from "react";
import { Heading, SelectComponent } from ".";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { useMain, useTab } from "../hooks";
import { useRenderArea } from "./RenderArea";

const RenderHeading = () => {
  const [selectedTemplate, setSelectedTemplate] = useRenderArea()

  const handleForm = (tab_id, main_id) => {
    setSelectedTemplate({tab_id, main_id})
  };
  
  return (
    <div className="sticky top-2">
      <div className="flex justify-between items-center mb-4">
        <Heading title="Render" />
        <div className="space-x-2">
          <RenderForm handleForm={handleForm} />
        </div>
      </div>
    </div>
  );
};

const RenderForm = ({ handleForm }) => {
  const [mains, setMain] = useMain();
  const [tabs, setTabs] = useTab();

  if (!mains.length) {
    return null
  }

  if (!tabs.length) {
    return null
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ tab_id, mainId }) => {
    handleForm(tab_id, mainId)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="md:col-span-1 col-span-2">
          <Controller
            control={control}
            name="tab_id"
            rules={{
              required: {
                value: true,
                message: "Please select key."
              },
            }}
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
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
        <div className="md:col-span-1 col-span-2">
          <Controller
            control={control}
            name="mainId"
            rules={{
              required: {
                value: true,
                message: "Please select template."
              },
            }}
            render={({ field }) => {
              return (
                <SelectComponent
                  {...field}
                  onValueChange={field.onChange}
                  placeholder={"Select template"}
                  items={mains}
                />
              );
            }}
          />
          {errors.mainId && (
            <span className="text-red-300 text-sm">
              {errors.mainId.message}
            </span>
          )}
        </div>
        <Button className="md:col-span-2 col-span-4 text-xs md:text-base md:mt-0 mt-2" type="submit">Render template</Button>
      </div>
    </form>
  );
};

export default RenderHeading;
