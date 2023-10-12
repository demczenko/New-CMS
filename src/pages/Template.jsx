import React, { useState } from "react";
import { Heading } from "../components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";

const Template = () => {
  const [activeTab, setActiveTab] = useState("template");
  const [isFormOpen, setFormOpen] = useState(false);

  const handleAddClick = () => {
    setFormOpen(!isFormOpen);
  };

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    setFormOpen(false);
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <Heading title="Template" />
        <div className="space-x-2">
          <Button className="py-1 px-2 md:py-2 md:px-4 text-sm" onClick={handleAddClick}>
            Add {activeTab}
          </Button>
        </div>
      </div>
      <Tabs defaultValue="template" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            onClick={() => handleActiveTab("main")}
            className="w-full"
            value="template">
            Main
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleActiveTab("header")}
            className="w-full"
            value="header">
            Header
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleActiveTab("footer")}
            className="w-full"
            value="footer">
            Footer
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleActiveTab("css")}
            className="w-full"
            value="css">
            Css
          </TabsTrigger>
        </TabsList>
        <TabsContent value="template">

        </TabsContent>
        <TabsContent value="header">

        </TabsContent>
        <TabsContent value="footer">

        </TabsContent>
        <TabsContent value="css">

        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Template;
