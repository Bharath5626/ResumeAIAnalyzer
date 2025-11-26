import React from "react";
import { useResume } from "../hooks/useResume";

import ClassicPreview from "./template-previews/ClassicPreview";
import ModernBluePreview from "./template-previews/ModernBluePreview";
import TwoColumnPreview from "./template-previews/TwoColumnPreview";
import SidebarPreview from "./template-previews/SidebarPreview";
import ExecutivePreview from "./template-previews/ExecutivePreview";

export default function ResumePreview({ viewMode = "page" }) {
  const { resumeData } = useResume();
  const template = resumeData?.template;

  const wrapperClass =
    viewMode === "page"
      ? "flex justify-center items-start bg-gray-200 p-4"
      : "bg-white p-4";

  const pageClass =
    viewMode === "page"
      ? "bg-white shadow-lg w-[800px] min-h-[1120px]"
      : "bg-white shadow border rounded-xl w-full";

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicPreview />;
      case "modern-blue":
        return <ModernBluePreview />;
      case "two-column":
        return <TwoColumnPreview />;
      case "sidebar":
        return <SidebarPreview />;
      case "executive":
        return <ExecutivePreview />;
      default:
        return <ClassicPreview />;
    }
  };

  return (
    <div className={wrapperClass}>
      <div className={pageClass}>
        {renderTemplate()}
      </div>
    </div>
  );
}
