import React, { useEffect } from "react";
import { Heading } from "../components";
import { SRC_TAGS } from "../constance/SRC_TAGS";
import { HREF_TAGS } from "../constance/HREF_TAGS";

const Render = () => {
  const { id, type } = selectedData;
  const { key } = selectedKey;
  const isAlreadySwapped = targets.find((item) => item.target === node);

  const handleHrefAttribute = () => {
    if (!HREF_TAGS.includes(node.nodeName.toLowerCase())) {
      toast({
        variant: "destructive",
        title: `Sorry, but i can't change href attribute for ${node.nodeName} tag.`,
      });
      return false;
    }
    return true;
  };

  const handleSrcAttribute = () => {
    if (!SRC_TAGS.includes(node.nodeName.toLowerCase())) {
      toast({
        variant: "destructive",
        title: `Sorry, but i can't change src attribute for ${node.nodeName} tag.`,
      });
      return false;
    }
    return true;
  };

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

        setTargets((prev) => [
          ...prev,
          { index: id, type: type, target: node },
        ]);
      } else {
        toast({
          variant: "destructive",
          title: "Node is already taken.",
          description: `This node is already taken by ${isAlreadySwapped.type} index ${isAlreadySwapped.index}. You want overwrite linked data?`,
          action: (
            <>
              <ToastAction
                onClick={() => {
                  if (type === "link") {
                    if (handleHrefAttribute()) {
                      return;
                    }
                  }

                  if (type === "image") {
                    if (!handleSrcAttribute()) {
                      return;
                    }
                  }
                  setTargets((prev) => {
                    return prev.map((item) => {
                      if (item.target === node) {
                        return {
                          index: id,
                          type: type,
                          target: node,
                        };
                      }
                      return item;
                    });
                  });
                }}
                altText="Swap">
                Confirm
              </ToastAction>
              <ToastAction
                onClick={() => {
                  setNode(null);
                  setIdx({ id: "", type: "" });
                  dismiss();
                }}
                altText="Try again">
                Cancel
              </ToastAction>
            </>
          ),
        });
      }
    }
  }, [id, type, node]);

  useEffect(() => {
    setNode(null);
    setIdx({ id: "", type: "" });
    for (const key in targets) {
      const node = targets[key];

      if (node.type === "text_node") {
        const selectedItemData = selectedKey.data.find(
          (item) => item.type === "text_node"
        )["text_node"];
        node.target.textContent = selectedItemData[node.index];
      }

      if (node.type === "href") {
        const selectedItemData = selectedKey.data.find(
          (item) => item.type === "href"
        )["href"];
        node.target.href = selectedItemData[node.index];
      }

      if (node.type === "src") {
        const { file_type, server, value } = images[node.index];
        const selectedItemData = selectedKey.data.find(
          (item) => item.type === "src"
        )["src"];
        // const link = server + country.toLowerCase() + value + file_type;
        // node.target.src = link;
      }
    }
  }, [targets, key]);

  useEffect(() => {
    if (!ref.current) return;

    function handleNodeClick(ev) {
      if (!type) {
        toast({
          variant: "destructive",
          title: "Firstly select data then place.",
        });
      }

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
  }, [id, type]);
  return (
    <section>
      <Heading title="Render" />
      <div
        className="bg-gray-300 overflow-y-auto -mt-16"
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: "",
        }}
      />
    </section>
  );
};

export default Render;
