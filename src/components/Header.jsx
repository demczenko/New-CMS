import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useHeader } from "../hooks";
import { Heading } from ".";

const Header = ({ isFormOpen, setFormClose }) => {
  const [html, setHtml] = useHeader();
  const handleForm = ({ html }) => {
    setHtml(html);
    setFormClose();
  };
  return (
    <div>
      {isFormOpen && <HeaderForm handleForm={handleForm} />}
      {html.length > 0 && <ManageTemplate html={html} />}
    </div>
  );
};

const ManageTemplate = ({ html }) => {
  const [, setHtml] = useHeader();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleSaveClick = ({ html }) => {
    setHtml(html);
    setIsEditOpen();
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Heading
          title={"Header template"}
          subtitle={"Manage header html document."}
        />
        <div className="space-x-2">
          <Button
            className="py-1 px-2 md:py-2 md:px-4 text-sm"
            onClick={handleEditClick}>
            Edit header document
          </Button>
        </div>
      </div>
      {isEditOpen ? (
        <HeaderForm html={html} handleForm={handleSaveClick} />
      ) : (
        <div
          className="max-h-[600px] md:max-h-[800px] overflow-auto max-w-full md:max-w-[50%]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
};

const HeaderForm = ({ handleForm, html }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      html: html && html,
    },
  });

  const onSubmit = (data) => {
    handleForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-1 grid grid-cols-4 gap-x-2">
        <div className="col-span-3">
          <Textarea
            rows={30}
            placeholder="Enter html template..."
            className="max-h-[800px]"
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
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default Header;
