import { useFooter, useHeader, useMain, useTab } from "../hooks";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const HeaderActions = ({
  activeTab,
  handleLinkTabsAndValuesClick,
  handleAddClick,
}) => {
  const [tabs, setTabs] = useTab();
  const [mains, setHtml] = useMain();
  const [footer, setFooter] = useFooter();
  const [header, setHeader] = useHeader();

  return (
    <>
      <div className="space-x-2 md:block hidden">
        <Button
          className="py-1 px-2 md:py-2 md:px-4 text-sm"
          onClick={handleAddClick}>
          Add {activeTab}
        </Button>
        {(activeTab === "header" || activeTab === "footer") && (
          <>
            {tabs.length > 0 && mains.length > 0 && (
              <Button
                className="py-1 px-2 md:py-2 md:px-4 text-sm"
                onClick={handleLinkTabsAndValuesClick}>
                Link {activeTab}
              </Button>
            )}
          </>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="block md:hidden" asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>
            <span className="capitalize">{activeTab}</span> Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="space-y-2">
            <DropdownMenuItem asChild>
              <Button
                className="py-1 px-2 md:py-2 md:px-4 text-sm rounded-md"
                onClick={handleAddClick}>
                Add {activeTab}
              </Button>
            </DropdownMenuItem>
            {(activeTab === "header" || activeTab === "footer") && (
              <>
                {header.length > 0 && footer.length > 0 && (
                  <DropdownMenuItem asChild>
                    <Button
                      className="py-1 px-2 md:py-2 md:px-4 text-sm rounded-md"
                      onClick={handleLinkTabsAndValuesClick}>
                      Link {activeTab}
                    </Button>
                  </DropdownMenuItem>
                )}
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeaderActions;
