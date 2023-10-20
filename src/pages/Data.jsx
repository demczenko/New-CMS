import React, { useState } from "react";
import { Heading, TabContent, TitleContent, ValueContent } from "../components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { useTab, useTitle, useValue } from "../hooks";

const Data = () => {
  const [tabs, setTabs] = useTab();
  const [titles, setTitles] = useTitle();
  const [values, setValues] = useValue();

  const [activeTab, setActiveTab] = useState("tabs");
  const [isFormOpen, setFormOpen] = useState(false);
  const [isTabFormOpen, setIsTabFormOpen] = useState(false);

  const handleAddClick = () => {
    setFormOpen(!isFormOpen);
  };

  const handleLinkTabsAndValuesClick = () => {
    setIsTabFormOpen(!isTabFormOpen);
  };

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    setFormOpen(false);
    setIsTabFormOpen(false);
  };

  return (
    <section>
      <div className="flex justify-between items-center md:mb-6 mb-4">
        <Heading title="Data" />
        <div className="space-x-2">
          <Button
            className="py-1 px-2 md:py-2 md:px-4 text-sm"
            onClick={handleAddClick}>
            Add {activeTab}
          </Button>
          {activeTab === "tabs" && (
            <>
              {tabs.length > 0 && titles.length > 0 && values.length > 0 && (
                <Button
                  className="py-1 px-2 md:py-2 md:px-4 text-sm"
                  onClick={handleLinkTabsAndValuesClick}>
                  Link tab and value
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <Tabs defaultValue="tabs" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            onClick={() => handleActiveTab("tabs")}
            className="w-full"
            value="tabs">
            Tabs
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleActiveTab("titles")}
            className="w-full"
            value="titles">
            Titles
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleActiveTab("values")}
            className="w-full"
            value="values">
            Values
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tabs">
          <TabContent
            isTabFormOpen={isTabFormOpen}
            isFormOpen={isFormOpen}
            setIsTabFormClose={() => setIsTabFormOpen(false)}
            setFormClose={() => setFormOpen(false)}
          />
        </TabsContent>
        <TabsContent value="titles">
          <TitleContent
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
          />
        </TabsContent>
        <TabsContent value="values">
          <ValueContent
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Data;
