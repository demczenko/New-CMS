import React, { useState } from "react";
import { Heading, TabContent, TitleContent, ValueContent } from "../components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";

const Data = () => {
  const [activeTab, setActiveTab] = useState("tabs")

  const handleAddClick = () => {

  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <Heading title="Data" />
        <Button>Add {activeTab}</Button>
      </div>
      <Tabs defaultValue="tabs" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger onClick={() => setActiveTab("tabs")} className="w-full" value="tabs">
            Tabs
          </TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab("titles")}className="w-full" value="titles">
            Titles
          </TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab("values")} className="w-full" value="values">
            Values
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tabs">
          <TabContent />
        </TabsContent>
        <TabsContent value="titles">
          <TitleContent />
        </TabsContent>
        <TabsContent value="values">
          <ValueContent />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Data;
