import { ImageProps } from "../common.model";
import { PageReference } from "../common.model";
export interface TabProps {
  title:string;
  tabs:  tabs[];
  tab_orientation?: "Vertical" | "Horizontal";
}

interface tabs {
  title: string;
  description: string; 
}
 
