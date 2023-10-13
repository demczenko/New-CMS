import React, { useState } from "react";
import { Footer, Header, HeaderActions, Heading, Main } from "../components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useFooter, useHeader, useMain } from "../hooks";

const Template = () => {
  const [mainHtml, setMainHtml] = useMain();
  const [footerHtml, setFooterHtml] = useFooter();
  const [headerHtml, setHeaderHtml] = useHeader();

  const [activeTab, setActiveTab] = useState("main");
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
      <div className="flex justify-between items-center mb-6">
        <Heading title="Templates" />
        <HeaderActions activeTab={activeTab} handleLinkTabsAndValuesClick={handleLinkTabsAndValuesClick} handleAddClick={handleAddClick}/>
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
            isTabFormOpen={isTabFormOpen}
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
            setIsTabFormClose={() => setIsTabFormOpen(false)}
          />
        </TabsContent>
        <TabsContent value="header">
          <Header
            isTabFormOpen={isTabFormOpen}
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
            setIsTabFormClose={() => setIsTabFormOpen(false)}
          />
        </TabsContent>
        <TabsContent value="footer">
          <Footer
            isTabFormOpen={isTabFormOpen}
            isFormOpen={isFormOpen}
            setFormClose={() => setFormOpen(false)}
            setIsTabFormClose={() => setIsTabFormOpen(false)}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Template;
