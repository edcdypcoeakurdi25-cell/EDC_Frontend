import { useContext } from "react";
import OpeningBuilderContext from "../context/OpeningBuilderContext";

export const useOpeningBuilder = () => useContext(OpeningBuilderContext);
