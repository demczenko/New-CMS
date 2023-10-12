import React, { useState } from "react";
import { Footer, Header, Heading, Main } from "../components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useFooter, useHeader, useMain } from "../hooks";
import { Button } from "../components/ui/button";

const Template = () => {
  const [mainHtml, setMainHtml] = useMain();
  const [footerHtml, setFooterHtml] = useFooter();
  const [headerHtml, setHeaderHtml] = useHeader();

  const [activeTab, setActiveTab] = useState("main");
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
          {activeTab === "main" && (
            <>
              {!(mainHtml.length > 0) && (
                <Button
                  className="py-1 px-2 md:py-2 md:px-4 text-sm"
                  onClick={handleAddClick}>
                  Add {activeTab}
                </Button>
              )}
            </>
          )}
          {activeTab === "header" && (
            <>
              {!(headerHtml.length > 0) && (
                <Button
                  className="py-1 px-2 md:py-2 md:px-4 text-sm"
                  onClick={handleAddClick}>
                  Add {activeTab}
                </Button>
              )}
            </>
          )}
          {activeTab === "footer" && (
            <>
              {!(footerHtml.length > 0) && (
                <Button
                  className="py-1 px-2 md:py-2 md:px-4 text-sm"
                  onClick={handleAddClick}>
                  Add {activeTab}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <Tabs defaultValue="main" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            onClick={() => handleActiveTab("main")}
            className="w-full"
            value="main">
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
        </TabsList>
        <TabsContent value="main">
          <Main
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
          />
        </TabsContent>
        <TabsContent value="header">
          <Header
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
          />
        </TabsContent>
        <TabsContent value="footer">
          <Footer
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Template;
