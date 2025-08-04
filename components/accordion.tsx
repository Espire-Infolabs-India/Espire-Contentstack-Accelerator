import Typography from "@mui/material/Typography";
import { AccordionComponent } from "../model/component-props/accordion.model";
import { AccordionItem } from "../model/component-props/accordion.model";
import { Accordion as MUIAccordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from "html-react-parser";

const Accordion = ({ accordion, heading }: AccordionComponent) => {
  return (
    <div>
      <Typography
        variant="h5"
        component="h2"
        className="text-center font-bold uppercase mb-4 text-gray-800 w-full flex justify-center"
      >
        {heading}
      </Typography>

      {accordion?.map(
        (item: AccordionItem, index: number) => (
          <MUIAccordion key={index} defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="span">
                {parse(item.title)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            {parse(item.description)}
            </AccordionDetails>
          </MUIAccordion>
        )
      )}
    </div>
  );
};

export default Accordion;
