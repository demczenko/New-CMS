import React, { useEffect, useMemo, useRef, useState } from "react";
import { Heading, TemplateNotFound } from "../components";
import { SRC_TAGS } from "../constance/SRC_TAGS";
import { HREF_TAGS } from "../constance/HREF_TAGS";
import { useRenderArea } from "../components/RenderArea";
import { useFooter, useHeader, useMain, useTab, useValue } from "../hooks";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";

const Render = () => {
  const [node, setNode] = useState();
  const ref = useRef();

  const [tabs, setTabs] = useTab();
  const [main, setMain] = useMain();
  const [values, setValues] = useValue();

  const [headers, setHeader] = useHeader();
  const [footers, setFooter] = useFooter();
  const {
    values: { selectedTabAndMainId, selectedData, targets },
    functions: { setNewTarget, setSelectedData },
  } = useRenderArea();
  const { id, type } = selectedData;
  const { tab_id, main_id } = selectedTabAndMainId;

  const swapText = (node) => {
    console.log(node);
    const findTabObj = tabs.find((tab) => tab.id === tab_id);
    const findValueId = findTabObj.data.find(
      (item) => item.titleId === node.titleId
    );
    const valueData = values.find((item) => item.id === findValueId.valueId);
    node.target.textContent = valueData.data[node.valueId];
  };

  const swapHref = (node) => {
    const findTabObj = tabs.find((tab) => tab.id === tab_id);
    const findValueId = findTabObj.data.find(
      (item) => item.titleId === node.titleId
    );
    const valueData = values.find((item) => item.id === findValueId.valueId);

    node.target.href = valueData.data[node.valueId];
  };

  const swapSrc = (node) => {
    const findTabObj = tabs.find((tab) => tab.id === tab_id);
    const findValueId = findTabObj.data.find(
      (item) => item.titleId === node.titleId
    );
    const valueData = values.find((item) => item.id === findValueId.valueId);

    node.target.src = valueData.data[node.valueId];
  };

  const handleHrefAttribute = (node) => {
    const findANodes = () => {
      const closest = node.closest("a");
      if (closest && closest.nodeName.toLowerCase() === "a") {
        setNode(closest);
      }
    };
    if (!HREF_TAGS.includes(node.nodeName.toLowerCase())) {
      toast((t) => (
        <div className="flex flex-col gap-2 items-center">
          <span>Href attribute is not valid for {node.nodeName} tag</span>
          <div className="flex gap-2">
            <Button
              className="py-1 px-2"
              variant="destructive"
              onClick={() => toast.dismiss(t.id)}>
              Close
            </Button>
            <Button
              className="py-1 px-2"
              variant="outline"
              onClick={findANodes}>
              Find closest
            </Button>
          </div>
        </div>
      ));
    }
  };

  const handleSrcAttribute = (node) => {
    const findImgNodes = () => {
      const closest = node.closest("img");
      if (closest && closest.nodeName.toLowerCase() === "img") {
        setNode(closest);
      }
    };
    if (!SRC_TAGS.includes(node.nodeName.toLowerCase())) {
      toast((t) => (
        <div className="flex flex-col gap-2 items-center">
          <span>Href attribute is not valid for {node.nodeName} tag</span>
          <div className="flex gap-2">
            <Button
              className="py-1 px-2"
              variant="destructive"
              onClick={() => toast.dismiss(t.id)}>
              Close
            </Button>
            <Button
              className="py-1 px-2"
              variant="outline"
              onClick={findImgNodes}>
              Find closest
            </Button>
          </div>
        </div>
      ));
    }
  };

  useEffect(() => {
    if (node) {
      setNewTarget((prev) => [...prev, { ...selectedData, target: node }]);
      setNode();
      setSelectedData({ id: "", type: "" });
    }
  }, [node, selectedData, setNewTarget, setNode, setSelectedData]);
  if (targets.length) {
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
    if (node) {
      toast.success("Swapped successfully.");
    }
  }

  useEffect(() => {
    if (!ref.current) return;

    function handleNodeClick(ev) {
      ev.preventDefault();
      if (type !== undefined) {
        if (type === "href") {
          handleHrefAttribute(ev.target);
          return;
        }

        if (type === "scr") {
          handleSrcAttribute(ev.target);
          return;
        }
        setNode(ev.target);
        toast.success("Node selected.");
      } else {
        toast.error("Firstly select data.");
      }
    }

    ref.current.addEventListener("click", handleNodeClick);
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("click", handleNodeClick);
    };
  }, [tab_id, type]);

  const mainHtmlTemplateToRender = useMemo(() => {
    if (!main_id) {
      return;
    }
    return main.find((template) => template.id === main_id)?.html;
  }, [main_id]);

  if (mainHtmlTemplateToRender === undefined) {
    return <TemplateNotFound />;
  }

  let selectedTab = tabs.find((tab) => tab.id === selectedTabAndMainId.tab_id);

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

  return (
    <section>
      {headerHtmlTemplateToRender && (
        <div
          className="bg-gray-200"
          dangerouslySetInnerHTML={{
            __html: headerHtmlTemplateToRender.html,
          }}
        />
      )}
      <div
        ref={ref}
        className="bg-gray-200"
        dangerouslySetInnerHTML={{
          __html: mainHtmlTemplateToRender,
        }}
      />
      {footerHtmlTemplateToRender && (
        <div
          className="bg-gray-200"
          dangerouslySetInnerHTML={{
            __html: footerHtmlTemplateToRender.html,
          }}
        />
      )}
    </section>
  );
};

export default Render;
