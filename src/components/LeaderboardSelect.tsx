import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { FC } from 'react';

export const LeaderboardSelect: FC<any> = ({ setBoard }) => {
  return (
    <div className="flex justify-center">
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="scoogi-twitter"
          name="row-radio-buttons-group"
          onChange={(event) => setBoard(event.target.value)}
        >
          <FormControlLabel value="scoogi" control={<Radio />} label="Scoogi" />
          <FormControlLabel
            value="twitter"
            control={<Radio />}
            label="Twitter Handle"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
