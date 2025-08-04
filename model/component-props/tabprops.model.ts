import { ImageProps } from "../common.model";
import { PageReference } from "../common.model";
export interface TabProps {
  title:string;
  tabs:  tabs[];
}

interface tabs {
  title: string;
  description: string; 
}
 
