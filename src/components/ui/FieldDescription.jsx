import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Badge } from "./badge";
import { InfoIcon } from "lucide-react";

const FieldDescription = ({ description }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="mt-1">
          <Badge className="text-sm rounded-sm text-neutral-300 bg-neutral-50 hover:bg-slate-300 hover:text-neutral-50">
            <InfoIcon className="h-3 w-3 mr-2" /> info
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FieldDescription;
