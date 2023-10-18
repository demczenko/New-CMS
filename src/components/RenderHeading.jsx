import React from "react";
import { Heading, SelectComponent } from ".";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { useMain, useTab } from "../hooks";
import { useRenderArea } from "./RenderArea";
import { Render } from "../pages";

const RenderHeading = () => {
  const {
    values: { selectedTabAndMainId, isOpen },
    functions: { setselectedTabAndMainId, setIsOpen },
  } = useRenderArea();

  const handleForm = (tab_id, main_id) => {
    setselectedTabAndMainId({ tab_id, main_id });
  };

  return (
    <div
      className={`col-span-full ${
        isOpen ? "md:col-span-6" : "md:col-span-8"
      } py-4`}>
      <div className="container mx-auto px-4">
        <div className="sticky top-2">
          <div className="flex justify-between items-center mb-4">
            <Heading title="Render" />
            <div className="space-x-2">
              <RenderForm handleForm={handleForm} />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <Render />
      </div>
    </div>
  );
};

const RenderForm = ({ handleForm }) => {
  const [mains, setMain] = useMain();
  const [tabs, setTabs] = useTab();

  if (!mains.length) {
    return null;
  }

  if (!tabs.length) {
    return null;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ tab_id, mainId }) => {
    handleForm(tab_id, mainId);
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
                message: "Please select key.",
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
                message: "Please select template.",
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
        <Button
          className="md:col-span-2 col-span-4 text-xs md:text-base md:mt-0 mt-2"
          type="submit">
          <div className="w-4 h-4 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 16 17"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              role="img">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9927 0.821758C12.9372 0.779878 12.8695 0.757217 12.8 0.757202C12.7305 0.757217 12.6628 0.779878 12.6073 0.821758C12.5518 0.863639 12.5115 0.922458 12.4924 0.989317L12.1454 2.20365C12.0708 2.46518 11.9306 2.70334 11.7383 2.89566C11.546 3.08798 11.3078 3.2281 11.0463 3.30279L9.83189 3.64968C9.76507 3.66882 9.7063 3.70919 9.66447 3.7647C9.62263 3.8202 9.6 3.88781 9.6 3.95732C9.6 4.02682 9.62263 4.09444 9.66447 4.14994C9.7063 4.20544 9.76507 4.24581 9.83189 4.26496L11.0463 4.61185C11.3078 4.68654 11.546 4.82666 11.7383 5.01898C11.9306 5.21129 12.0708 5.44946 12.1454 5.71098L12.4924 6.92532C12.5115 6.99213 12.5519 7.0509 12.6074 7.09274C12.6629 7.13457 12.7305 7.1572 12.8 7.1572C12.8695 7.1572 12.9371 7.13457 12.9926 7.09274C13.0481 7.0509 13.0885 6.99213 13.1076 6.92532L13.4546 5.71098C13.5292 5.44946 13.6694 5.21129 13.8617 5.01898C14.054 4.82666 14.2922 4.68654 14.5537 4.61185L15.7681 4.26496C15.8349 4.24581 15.8937 4.20544 15.9355 4.14994C15.9774 4.09444 16 4.02682 16 3.95732C16 3.88781 15.9774 3.8202 15.9355 3.7647C15.8937 3.70919 15.8349 3.66882 15.7681 3.64968L14.5537 3.30279C14.5537 3.30279 14.054 3.08798 13.8617 2.89566C13.6694 2.70334 13.5292 2.46518 13.4546 2.20365L13.1076 0.989317C13.0885 0.922458 13.0482 0.863639 12.9927 0.821758ZM6.78537 4.08631C6.67435 4.00255 6.53907 3.95723 6.4 3.9572C6.26093 3.95723 6.12565 4.00255 6.01463 4.08631C5.90361 4.17007 5.8229 4.28771 5.7847 4.42143L5.09089 6.85011C4.94151 7.37315 4.66125 7.84948 4.27661 8.23412C3.89196 8.61875 3.41561 8.89899 2.89255 9.04837L0.463785 9.74216C0.330148 9.78044 0.212607 9.86119 0.128933 9.97219C0.0452584 10.0832 0 10.2184 0 10.3574C0 10.4964 0.0452584 10.6317 0.128933 10.7427C0.212607 10.8537 0.330148 10.9344 0.463785 10.9727L2.89255 11.6665C3.41561 11.8159 3.89196 12.0961 4.27661 12.4808C4.66125 12.8654 4.94151 13.3417 5.09089 13.8648L5.7847 16.2934C5.82298 16.4271 5.90373 16.5446 6.01474 16.6283C6.12575 16.7119 6.26099 16.7572 6.4 16.7572C6.53901 16.7572 6.67425 16.7119 6.78525 16.6283C6.89626 16.5446 6.97702 16.4271 7.0153 16.2934L7.70911 13.8648C7.85849 13.3417 8.13875 12.8654 8.52339 12.4808C8.90804 12.0961 9.38439 11.8159 9.90745 11.6665L12.3362 10.9727C12.4699 10.9344 12.5874 10.8537 12.6711 10.7427C12.7547 10.6317 12.8 10.4964 12.8 10.3574C12.8 10.2184 12.7547 10.0832 12.6711 9.97219C12.5874 9.86119 12.4699 9.78044 12.3362 9.74216L9.90745 9.04837C9.90745 9.04837 8.90804 8.61875 8.52339 8.23412C8.13875 7.84948 7.85849 7.37315 7.70911 6.85011L7.0153 4.42143C6.9771 4.28771 6.89638 4.17007 6.78537 4.08631Z"
                fill="currentColor"></path>
            </svg>
          </div>
          Render template
        </Button>
      </div>
    </form>
  );
};

export default RenderHeading;
