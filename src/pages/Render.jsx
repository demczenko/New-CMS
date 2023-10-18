import React, { useEffect, useRef, useState } from "react";
import { Heading, TemplateNotFound } from "../components";
import { SRC_TAGS } from "../constance/SRC_TAGS";
import { HREF_TAGS } from "../constance/HREF_TAGS";
import { useRenderArea } from "../components/RenderArea";
import { useFooter, useHeader, useMain, useTab } from "../hooks";

const Render = () => {
  const ref = useRef();
  const [tabs, setTabs] = useTab();
  const [main, setMain] = useMain();
  const [headers, setHeader] = useHeader();
  const [footers, setFooter] = useFooter();

  const [node, setNode] = useState();
  const [selectedData, setSelectedData] = useState({ id: 1, type: "href" });
  const { id, type } = selectedData;

  console.log(node);

  const {
    values: { selectedTabAndMainId, targets },
    functions: { setNewTarget },
  } = useRenderArea();

  useEffect(() => {
    if (!ref.current) return;

    function handleNodeClick(ev) {
      ev.preventDefault();
      if (type === "href") {
        const aTag = ev.target.parentNode;
        setNode(aTag);
      } else {
        setNode(ev.target);
      }
    }

    ref.current.addEventListener("click", handleNodeClick);
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("click", handleNodeClick);
    };
  }, [type]);

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

  // const isAlreadySwapped = targets.find((item) => item.target === node);

  // const handleHrefAttribute = () => {
  //   if (!HREF_TAGS.includes(node.nodeName.toLowerCase())) {
  //     toast({
  //       variant: "destructive",
  //       title: `Sorry, but i can't change href attribute for ${node.nodeName} tag.`,
  //     });
  //     return false;
  //   }
  //   return true;
  // };

  // const handleSrcAttribute = () => {
  //   if (!SRC_TAGS.includes(node.nodeName.toLowerCase())) {
  //     toast({
  //       variant: "destructive",
  //       title: `Sorry, but i can't change src attribute for ${node.nodeName} tag.`,
  //     });
  //     return false;
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   if (node && type) {
  //     if (isAlreadySwapped === undefined) {
  //       if (type === "link") {
  //         if (!handleHrefAttribute()) {
  //           return;
  //         }
  //       }

  //       if (type === "image") {
  //         if (!handleSrcAttribute()) {
  //           return;
  //         }
  //       }

  //       setTargets((prev) => [
  //         ...prev,
  //         { index: id, type: type, target: node },
  //       ]);
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Node is already taken.",
  //         description: `This node is already taken by ${isAlreadySwapped.type} index ${isAlreadySwapped.index}. You want overwrite linked data?`,
  //         action: (
  //           <>
  //             <ToastAction
  //               onClick={() => {
  //                 if (type === "link") {
  //                   if (handleHrefAttribute()) {
  //                     return;
  //                   }
  //                 }

  //                 if (type === "image") {
  //                   if (!handleSrcAttribute()) {
  //                     return;
  //                   }
  //                 }
  //                 setTargets((prev) => {
  //                   return prev.map((item) => {
  //                     if (item.target === node) {
  //                       return {
  //                         index: id,
  //                         type: type,
  //                         target: node,
  //                       };
  //                     }
  //                     return item;
  //                   });
  //                 });
  //               }}
  //               altText="Swap">
  //               Confirm
  //             </ToastAction>
  //             <ToastAction
  //               onClick={() => {
  //                 setNode(null);
  //                 setSelectedData({ id: "", type: "" });
  //                 dismiss();
  //               }}
  //               altText="Try again">
  //               Cancel
  //             </ToastAction>
  //           </>
  //         ),
  //       });
  //     }
  //   }
  // }, [id, type, node]);

  // useEffect(() => {
  //   setNode(null);
  //   setSelectedData({ id: "", type: "" });
  //   for (const key in targets) {
  //     const node = targets[key];

  //     if (node.type === "text_node") {
  //       const selectedItemData = selectedKey.data.find(
  //         (item) => item.type === "text_node"
  //       )["text_node"];
  //       node.target.textContent = selectedItemData[node.index];
  //     }

  //     if (node.type === "href") {
  //       const selectedItemData = selectedKey.data.find(
  //         (item) => item.type === "href"
  //       )["href"];
  //       node.target.href = selectedItemData[node.index];
  //     }

  //     if (node.type === "src") {
  //       const { file_type, server, value } = images[node.index];
  //       const selectedItemData = selectedKey.data.find(
  //         (item) => item.type === "src"
  //       )["src"];
  //       // const link = server + country.toLowerCase() + value + file_type;
  //       // node.target.src = link;
  //     }
  //   }
  // }, [targets, selectedTemplate]);



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
