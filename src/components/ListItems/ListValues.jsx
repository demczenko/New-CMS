import { Edit2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { useValue } from "../../hooks";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const ListValues = ({ item, titleId, render = false, setSelectedData }) => {
  const [values, setValues] = useValue();
  const [selectedValue, setSelectedValue] = useState();
  const [editValue, setEditValue] = useState();

  if (!editValue && selectedValue) {
    const result = values.find((value) => value.id === selectedValue.valueId)
      .data[selectedValue.index];
    setEditValue(result);
  }

  const handleSelectedItem = (item) => {
    setSelectedData(item);
    toast.success(item.type + " selected");
  };
  const handeSave = (valueId) => {
    setValues((prev) => {
      return prev.map((item) => {
        if (item.id === valueId) {
          item.data[selectedValue.index] = editValue;
          return {
            ...item,
            data: [...item.data],
          };
        }
        return item;
      });
    });
    toast.success("Value changed successfully.")
  };

  return (
    <Dialog>
      <details>
        <summary className="cursor-pointer font-semibold text-base bg-slate-100 p-2 rounded-md capitalize mb-2">
          {item.value}
        </summary>
        <ul className="space-y-1">
          {item.data.map((elem, id) => {
            return (
              <div key={elem + id} className="flex items-center">
                <li className="text-sm text-neutral-600 bg-slate-50 p-2 rounded-md md:ml-4 ml-2 relative w-full">
                  {elem}
                  {render && (
                    <p
                      onClick={() =>
                        handleSelectedItem({
                          titleId: titleId,
                          valueId: id,
                          type: item.dataType,
                        })
                      }
                      className="absolute top-1/2 -translate-y-1/2 right-1 hover:bg-slate-200 transition-colors px-3 font-semibold lowercase rounded-md py-1 text-xs cursor-pointer bg-slate-50">
                      select item
                    </p>
                  )}
                </li>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setSelectedValue({
                        index: id,
                        valueId: item.id,
                      });
                    }}
                    variant="outlined"
                    className="p-2">
                    <Edit2Icon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </div>
            );
          })}
        </ul>
      </details>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit value</DialogTitle>
          <DialogDescription>When you are done, save it.</DialogDescription>
        </DialogHeader>
        <div>
          {selectedValue && (
            <Input
              value={editValue}
              onChange={(ev) => setEditValue(ev.target.value)}
            />
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => handeSave(item.id)}
            type="button"
            variant="secondary">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListValues;
