import React, { useEffect, useRef, useState } from "react";
import { Heading, TemplateNotFound } from "../components";
import { SRC_TAGS } from "../constance/SRC_TAGS";
import { HREF_TAGS } from "../constance/HREF_TAGS";
import { useRenderArea } from "../components/RenderArea";
import { useFooter, useHeader, useMain, useTab, useValue } from "../hooks";
import { toast } from "react-hot-toast";

const Render = () => {
  const [node, setNode] = useState();
  const ref = useRef();
  
  const [tabs, setTabs] = useTab();
  const [main, setMain] = useMain();
  const [values, setValues] = useValue();

  const [headers, setHeader] = useHeader();
  const [footers, setFooter] = useFooter();

  const {
    values: { selectedTabAndMainId, isOpen, selectedData, targets },
    functions: {
      setselectedTabAndMainId,
      setIsOpen,
      setSelectedData,
      setNewTarget,
    },
  } = useRenderArea();

  const { id, valueId, type } = selectedData;

  const swapText = (node) => {
    const findValueData = values.find((value) => value.id === node.id);
    node.target.textContent = findValueData.data[node.index];
  };

  const swapHref = (node) => {};

  const swapSrc = (node) => {};

  useEffect(() => {
    if (node && type) {
      if (isAlreadySwapped === undefined) {
        if (type === "link") {
          if (!handleHrefAttribute()) {
            return;
          }
        }

        if (type === "image") {
          if (!handleSrcAttribute()) {
            return;
          }
        }

        setNewTarget((prev) => [
          ...prev,
          { index: valueId, type: type, id: id, target: node },
        ]);
      } else {
        toast.error("Node is already taken");
      }
    }
  }, [id, type, node]);

  useEffect(() => {
    if (!ref.current) return;

    function handleNodeClick(ev) {
      // ev.preventDefault();
      // if (type === "href") {
      //   const aTag = ev.target.parentNode;
      //   setNode(aTag);
      // } else {
      //   setNode(ev.target);
      // }

      setNode(ev.target);
      toast.success("Node added.");
    }
    ref.current.addEventListener("click", handleNodeClick);
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("click", handleNodeClick);
    };
  }, []);

  let isAlreadySwapped;
  if (targets.length) {
    isAlreadySwapped = targets.find((item) => item.target === node);
    for (const key in targets) {
      const node = targets[key];

      if (node.type === "text") {
        swapText(node);
      }

      if (node.type === "href") {
        swapHref(node);
      }

      if (node.type === "src") {
        swapSrc(node);
      }
    }
  }

  if (!main.length) {
    return null;
  }

  const mainHtmlTemplateToRender = main.find(
    (template) => template.id === selectedTabAndMainId.main_id
  );

  if (mainHtmlTemplateToRender === undefined) {
    return <TemplateNotFound />;
  }

  const selectedTab = tabs.find(
    (tab) => tab.id === selectedTabAndMainId.tab_id
  );

  let headerHtmlTemplateToRender;
  let footerHtmlTemplateToRender;
  if (selectedTab.hasOwnProperty("footer_id")) {
    footerHtmlTemplateToRender = footers.find(
      (footer) => footer.id === selectedTab.footer_id
    );
  }

  if (selectedTab.hasOwnProperty("header_id")) {
    headerHtmlTemplateToRender = headers.find(
      (header) => header.id === selectedTab.header_id
    );
  }
  const getTemplateToRender = () => {
    if (!headerHtmlTemplateToRender && !footerHtmlTemplateToRender) {
      return mainHtmlTemplateToRender.html;
    }
    if (headerHtmlTemplateToRender && footerHtmlTemplateToRender) {
      return (
        headerHtmlTemplateToRender.html +
        mainHtmlTemplateToRender.html +
        footerHtmlTemplateToRender.html
      );
    }

    if (headerHtmlTemplateToRender) {
      return headerHtmlTemplateToRender.html + mainHtmlTemplateToRender.html;
    }

    if (footerHtmlTemplateToRender) {
      return mainHtmlTemplateToRender.html + footerHtmlTemplateToRender.html;
    }
  };

  const handleHrefAttribute = () => {
    if (!HREF_TAGS.includes(node.nodeName.toLowerCase())) {
      toast.error(`Href attribute is not acceptable for ${node.nodeName} tag`);
      return false;
    }
    return true;
  };

  const handleSrcAttribute = () => {
    if (!SRC_TAGS.includes(node.nodeName.toLowerCase())) {
      toast.error(`Src attribute is not acceptable for ${node.nodeName} tag`);
      return false;
    }
    return true;
  };

  return (
    <section>
      <div
        ref={ref}
        className="bg-gray-200"
        dangerouslySetInnerHTML={{
          __html: getTemplateToRender(),
        }}
      />
    </section>
  );
};

export default Render;
