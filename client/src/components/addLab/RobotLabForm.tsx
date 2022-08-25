import {useEffect, useState} from "react";
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

import {formInputStyle} from "../../styles/authFormStyles";
import ConfigService from "../../service/configService";
import {AppState, State} from "../App";
import {AddLabInfo} from "./AddLab";
import INoIdLabDto from "../../dto/lab/iNoIdLabDto";

interface RobotLabFormProps {
  topInfoState: AppState;
  addLabState: State<AddLabInfo>;
}

export default function RobotLabForm({topInfoState, addLabState}: RobotLabFormProps) {
  const [topInfo, topInfoSetter] = topInfoState;
  const [addLabInfo, addLabInfoSetter] = addLabState;

  // fetch configurable information
  const configService = new ConfigService();

  const [possibleCountries, setPossibleCountries] = useState<string[]>([]);
  const countriesAreFetched = () => possibleCountries.length !== 0;
  if (!countriesAreFetched())
    configService.getLabSupportedCountries({
      then: r => setPossibleCountries(r.data)
    });

  const [possibleComponents, setPossibleComponents] = useState<string[]>([]);
  const componentsAreFetched = () => possibleCountries.length !== 0;
  if (!componentsAreFetched())
    configService.getRobotSupportedComponents({
      then: r => setPossibleComponents(r.data)
    });

  // set loading while fetching config
  if ((!countriesAreFetched() || !componentsAreFetched()) && !topInfo.loading)
    // if the config hasn't been fully fetched yet, set loading to true
    topInfoSetter({...topInfo, loading: true});
  if (countriesAreFetched() && componentsAreFetched() && topInfo.loading)
    topInfoSetter({...topInfo, loading: false});

  // errors
  const nameError = addLabInfo.dto.name.trim() === '' || !/[\ -'0-9a-zÀ-ÿA-Z.,]+/.test(addLabInfo.dto.name);
  const countryError = addLabInfo.dto.country.trim() === '';
  useEffect(() =>
      addLabInfoSetter({...addLabInfo, error: nameError || countryError}),
    [nameError, countryError]);

  const setDto = (dto: INoIdLabDto) => addLabInfoSetter({...addLabInfo, dto});

  return <>
    {/* Lab name textfield */}
    <TextField
      autoFocus variant="filled" label="Name" style={formInputStyle}
      required error={nameError && addLabInfo.attemptedSubmit}
      onChange={e => setDto({...addLabInfo.dto, name: e.target.value})}
      value={addLabInfo.dto.name}
      helperText="An alphanumeric name. Accented characters and -'., are allowed."
    />

    {/* Lab hash textfield */}
    <TextField
      style={formInputStyle} variant="filled" label="Lab Hash"
      // todo labHash isn't currently being used
      // onChange={e => setDto({...addLabInfo.dto,labHash:e.target.value})}
      // value={addLabInfo.dto.labHash}
    />

    {/* Country select */}
    <FormControl required error={countryError && addLabInfo.attemptedSubmit}
                 style={{...formInputStyle, maxWidth: "50%", minWidth: 250}}>
      <InputLabel>Country</InputLabel>
      <Select label="Country" value={addLabInfo.dto.country}
              onChange={e => setDto({...addLabInfo.dto, country: e.target.value as string})}>
        {possibleCountries.map(country => <MenuItem value={country} key={country}> {country} </MenuItem>)}
      </Select>
    </FormControl>

    {/* Components checkboxes */}
    <FormControl style={formInputStyle}>
      <FormLabel component="legend">Components</FormLabel>
      <FormGroup row>
        {possibleComponents.map(componentName =>
          <FormControlLabel
            label={componentName} name={componentName} key={componentName}
            control={
              <Checkbox onChange={e => {
                const copy = [...addLabInfo.dto.components];
                if (e.target.checked) copy.push(e.target.name);
                else copy.splice(copy.indexOf(e.target.name), 1);
                setDto({...addLabInfo.dto, components: copy});
              }} checked={addLabInfo.dto.components.includes(componentName)}/>
            }/>)}
      </FormGroup>
    </FormControl>
  </>;
}

