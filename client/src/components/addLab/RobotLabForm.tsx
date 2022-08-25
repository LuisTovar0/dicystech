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
import {LabFormProps} from "./AddLab";
import INoIdLabDto from "../../dto/lab/iNoIdLabDto";

export default function RobotLabForm({topInfoState, addLabState}: LabFormProps) {
  const [topInfo, topInfoSetter] = topInfoState;
  const [addLabInfo, addLabInfoSetter] = addLabState;

  //#region fetch configurable information
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
  //#endregion

  // set loading while fetching config
  if ((!countriesAreFetched() || !componentsAreFetched()) && !topInfo.loading)
    // if the config hasn't been fully fetched yet, set loading to true
    topInfoSetter({...topInfo, loading: true});
  if (countriesAreFetched() && componentsAreFetched() && topInfo.loading)
    topInfoSetter({...topInfo, loading: false});

  // errors
  const nameError = addLabInfo.robotDto.name.trim() === '' || !/[\ -'0-9a-zÀ-ÿA-Z.,]+/.test(addLabInfo.robotDto.name);
  const countryError = addLabInfo.robotDto.country.trim() === '';
  useEffect(() =>
      addLabInfoSetter({...addLabInfo, error: nameError || countryError}),
    [nameError, countryError]);

  const setDto = (dto: INoIdLabDto) => addLabInfoSetter({...addLabInfo, robotDto: dto});

  return <>
    {/* Lab name textfield */}
    <TextField
      autoFocus variant="filled" label="Name" style={formInputStyle}
      required error={nameError && addLabInfo.attemptedSubmit}
      onChange={e => setDto({...addLabInfo.robotDto, name: e.target.value})}
      value={addLabInfo.robotDto.name}
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
      <Select label="Country" value={addLabInfo.robotDto.country}
              onChange={e => setDto({...addLabInfo.robotDto, country: e.target.value as string})}>
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
                const copy = [...addLabInfo.robotDto.components];
                if (e.target.checked) copy.push(e.target.name);
                else copy.splice(copy.indexOf(e.target.name), 1);
                setDto({...addLabInfo.robotDto, components: copy});
              }} checked={addLabInfo.robotDto.components.includes(componentName)}/>
            }/>)}
      </FormGroup>
    </FormControl>
  </>;
}

