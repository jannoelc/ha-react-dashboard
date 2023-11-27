import { useContext } from "react";
import { Context } from "@/components/Layout";

export const useRootElement = () => useContext(Context);
