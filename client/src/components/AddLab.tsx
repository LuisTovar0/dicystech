import {Dispatch, SetStateAction, useState} from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";

import {AppInfoSetter} from "./App";
import BaseComponent from "./auxiliar/BaseComponent";
import {formInputStyle} from "../styles/authFormStyles";
import {addLabFormStyle, addLabStyle} from "../styles/addLabStyles";

interface AddLabFieldInfoMap {
  name: AddLabField<string>;
  labHash: AddLabField<string>;
  country: AddLabField<string>;
  components: AddLabField<string[]>;
  labLogo: AddLabField<string>;
  labSchema: AddLabField<string>;
}

interface AddLabField<TCtrl> {
  name: string,
  value: TCtrl,
  setter: Dispatch<SetStateAction<TCtrl>>
}

export default function AddLab({topInfoState}: { topInfoState: AppInfoSetter }) {
  const possibleCountries = ['Portugal', 'United Kingdom', 'Greece', 'To do: add others'];

  const possibleComponents = ['LED', 'LCD Display', 'Temperature Sensor', 'Servomotor', 'Infrared (IR) Sensor', 'Buzzer', 'Potentiometer', 'Light Sensor'];
  const [componentsValue, componentsSetter] = useState([] as string[]);

  const states = [];
  for (let i = 0; i < 5; i++) states.push(useState(''));
  const fields = {
    name: {name: `Name`, value: states[0][0], setter: states[0][1]},
    labHash: {name: `LabHash`, value: states[1][0], setter: states[1][1]},
    country: {name: `Country`, value: states[2][0], setter: states[2][1]},
    components: {name: `Components`, value: componentsValue, setter: componentsSetter},
    labLogo: {name: 'Lab logo (optional)', value: states[3][0], setter: states[3][1]},
    labSchema: {name: 'Lab Schema (optional)', value: states[4][0], setter: states[4][1]}
  } as AddLabFieldInfoMap;

  return (<BaseComponent elem={
    <div style={addLabStyle}>
      <div style={addLabFormStyle}>
        <TextField
          style={formInputStyle}
          variant="filled"
          label={fields.name.name}
          onChange={e => fields.name.setter(e.target.value)}
          value={fields.name.value}
        />

        <TextField
          style={formInputStyle}
          variant="filled"
          label={fields.labHash.name}
          onChange={e => fields.labHash.setter(e.target.value)}
          value={fields.labHash.value}
        />

        <FormControl required style={{...formInputStyle, maxWidth: "50%", minWidth: 250}}>
          <InputLabel>Country</InputLabel>
          <Select label="Country" value={fields.country.value}
                  onChange={e => fields.country.setter(e.target.value as string)}>
            {possibleCountries.map(country =>
              <MenuItem value={country} key={country}>{country}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl style={formInputStyle}>
          <FormLabel component="legend">Components</FormLabel>
          <FormGroup row> {possibleComponents.map(componentName =>
            <FormControlLabel label={componentName} name={componentName} key={componentName}
                              control={<Checkbox onChange={e => {
                                const copy = [...componentsValue];
                                if (e.target.checked) copy.push(e.target.name);
                                else copy.splice(copy.indexOf(e.target.name), 1);
                                componentsSetter(copy);
                              }} checked={componentsValue.includes(componentName)}/>}
            />)} </FormGroup>
        </FormControl>
      </div>
    </div>} topInfoState={topInfoState} pageName="Add Lab"/>);
}
