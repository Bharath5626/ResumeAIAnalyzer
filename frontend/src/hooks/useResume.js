// src/hooks/useResume.js
import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

export function useResume() {
  return useContext(ResumeContext);
}
