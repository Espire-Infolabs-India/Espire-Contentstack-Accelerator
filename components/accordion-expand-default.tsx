import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export default function AccordionExpandDefault() {
  return (
    <div>
      <Accordion style={{borderBottom:"1px solid #333",boxShadow:"none", borderRadius:0}}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className='text-[20px]'>WHATS INCLUDED</span>
        </AccordionSummary>
        <AccordionDetails>
          <span>
          Orbi Quad-band Router (RBE971B)
          </span>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{borderBottom:"1px solid #333",boxShadow:"none", borderRadius:0, marginTop:0}}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <span className='text-[20px]'>TECHNICAL DETAILS</span>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Height
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
