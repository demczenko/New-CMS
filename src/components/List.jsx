import React from "react";
import { Heading } from ".";
import { useValue } from "../hooks/useValue";
import { useTitle } from "../hooks/useTitle";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";

const List = ({ items, title, subtitle, handleDelete }) => {
  if (!items.length) return null;
  const [values, setValues] = useValue();
  const [titles, setTitles] = useTitle();

  return (
    <div className="mt-6">
      {title && <Heading title={title} subtitle={subtitle} />}
      <ul className="space-y-6 mt-4">
        {items.map((item) => (
          <div key={item.id}>
            <li className="font-semibold text-base md:text-xl relative bg-slate-100 p-4 rounded-md capitalize pr-24 mb-2">
              {Array.isArray(item.value) ? item.value.join(", ") : item.value}
              {handleDelete && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Trash2 className="text-white h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete item</DialogTitle>
                      <DialogDescription>
                        Make sure that item is not connected to any tab. <br />
                        All tabs will be affected by this action.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      {items.find((elem) => elem.id === item.id).isSelected ? (
                        <span>
                          Item is selected within tabs.
                          <br />
                          Delete it from the selected items?
                        </span>
                      ) : (
                        <span>Item is not selected.</span>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        type="button"
                        variant="destructive">
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <div className="absolute left-2">
                {item.hasOwnProperty("isSelected")  && (
                  <Badge className="md:text-sm bg-slate-200 text-black dark:text-white hover:text-white text-xs">
                    <>{item.isSelected ? "Selected" : "Not selected"}</>
                  </Badge>
                )}
              </div>
            </li>
            {item?.data?.length > 0 && (
              <details className="pb-4">
                <summary className="cursor-pointer font-semibold text-base bg-slate-100 p-2 rounded-md capitalize mb-2">
                  Linked Titles and Values for {item.value} tab
                </summary>
                <div className="space-y-2">
                  <>
                    {item.data.map((item) =>
                      titles
                        .filter((title) => title.id === item.titleId)
                        .map((item) => (
                          <li
                            key={item.id}
                            className="font-semibold text-base bg-slate-100 p-2 rounded-md capitalize">
                            {Array.isArray(item.value)
                              ? item.value.join(", ")
                              : item.value}
                          </li>
                        ))
                    )}
                    {item.data.map((item) =>
                      values
                        .filter((value) => value.id === item.valueId)
                        .map((item) => (
                          <li
                            key={item.id}
                            className="font-semibold text-base bg-slate-100 p-2 rounded-md capitalize">
                            {Array.isArray(item.value)
                              ? item.value.join(", ")
                              : item.value}
                          </li>
                        ))
                    )}
                  </>
                </div>
              </details>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default List;
