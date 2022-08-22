import {Dispatch, SetStateAction, SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";

import {AppState} from "./App";
import BaseComponent from "./auxiliar/BaseComponent";
import {formInputStyle} from "../styles/authFormStyles";
import {addLabFormStyle, addLabStyle} from "../styles/addLabStyles";
import ConfigService from "../service/configService";
import LabService from "../service/labService";
import INoIdLabDto from "../dto/lab/iNoIdLabDto";
import ILabDto from "../dto/lab/iLabDto";

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

export default function AddLab({topInfoState}: { topInfoState: AppState }) {
  const [topInfo, topInfoSetter] = topInfoState;

  const navigate = useNavigate();
  const configService = new ConfigService();

  const [possibleCountries, setPossibleCountries] = useState([] as string[]);
  if (possibleCountries.length === 0)
    configService.getLabSupportedCountries({then: r => setPossibleCountries(r.data)});

  const [possibleComponents, setPossibleComponents] = useState([] as string[]);
  if (possibleComponents.length === 0)
    configService.getRobotSupportedComponents({then: r => setPossibleComponents(r.data)});

  useEffect(() => topInfoSetter({
    ...topInfo,
    loading: possibleComponents.length === 0 || possibleCountries.length === 0
  }), [possibleComponents, possibleComponents]);

  const [selectedComponentsValue, selectedComponentsSetter] = useState([] as string[]);

  const states = [];
  for (let i = 0; i < 5; i++) states.push(useState(''));
  const fields = {
    name: {name: `Name`, value: states[0][0], setter: states[0][1]},
    labHash: {name: `LabHash`, value: states[1][0], setter: states[1][1]},
    country: {name: `Country`, value: states[2][0], setter: states[2][1]},
    components: {name: `Components`, value: selectedComponentsValue, setter: selectedComponentsSetter},
    labLogo: {name: 'Lab logo (optional)', value: states[3][0], setter: states[3][1]},
    labSchema: {name: 'Lab Schema (optional)', value: states[4][0], setter: states[4][1]}
  } as AddLabFieldInfoMap;

  // errors
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const nameError = fields.name.value.trim() === '' || !/[\ -'0-9a-zÀ-ÿA-Z.,]+/.test(fields.name.value);
  const countryError = fields.country.value.trim() === '';
  const error = attemptedSubmit && (nameError || countryError);

  // success snackbar
  const handleSnackbarClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway')
      topInfoSetter({...topInfo, snackbar: undefined});
  };
  const snackbar = (name?: string) =>
    <Snackbar key="add-lab-success-snackbar" open onClose={handleSnackbarClose} autoHideDuration={60000}>
      <Alert severity="success" onClose={handleSnackbarClose}>
        {`Your Lab${name ? " " + name : ""} has been successfully created`}
      </Alert>
    </Snackbar>;

  const onSubmit = () => {
    setAttemptedSubmit(true);
    if (nameError || countryError) return;

    const dto: INoIdLabDto = {
      name: fields.name.value,
      country: fields.country.value,
      components: fields.components.value
    };
    const service = new LabService();
    service.addLab(dto, {
      then: r => {
        const data = r.data as ILabDto;
        topInfoSetter({...topInfo, snackbar: snackbar(data.name)});
      }
    });
  };

  // after successful submit
  useEffect(() => {
    if (topInfo.snackbar?.key === snackbar().key)
      navigate('/');
  }, [topInfo.snackbar]);

  return <BaseComponent elem={
    <div style={addLabStyle}>
      <div style={addLabFormStyle}>
        {/* Lab name textfield */}
        <TextField
          autoFocus
          style={formInputStyle}
          variant="filled"
          required error={nameError && attemptedSubmit}
          label={fields.name.name}
          onChange={e => fields.name.setter(e.target.value)}
          value={fields.name.value}
          helperText="An alphanumeric name. Accented characters and -'., are allowed."
        />

        {/* Lab hash textfield */}
        <TextField
          style={formInputStyle}
          variant="filled"
          label={fields.labHash.name}
          onChange={e => fields.labHash.setter(e.target.value)}
          value={fields.labHash.value}
        />

        {/* Country select */}
        <FormControl required error={countryError && attemptedSubmit}
                     style={{...formInputStyle, maxWidth: "50%", minWidth: 250}}>
          <InputLabel>Country</InputLabel>
          <Select label="Country" value={fields.country.value}
                  onChange={e => fields.country.setter(e.target.value as string)}>
            {possibleCountries.map(country =>
              <MenuItem value={country} key={country}>{country}</MenuItem>)}
          </Select>
        </FormControl>

        {/* Components checkboxes */}
        <FormControl style={formInputStyle}>
          <FormLabel component="legend">Components</FormLabel>
          <FormGroup row> {possibleComponents.map(componentName =>
            <FormControlLabel label={componentName} name={componentName} key={componentName}
                              control={<Checkbox onChange={e => {
                                const copy = [...selectedComponentsValue];
                                if (e.target.checked) copy.push(e.target.name);
                                else copy.splice(copy.indexOf(e.target.name), 1);
                                selectedComponentsSetter(copy);
                              }} checked={selectedComponentsValue.includes(componentName)}/>}
            />)} </FormGroup>
        </FormControl>

        {/* Submit button */}
        <div style={{display: 'flex', height: 60, alignItems: 'center'}}>
          <Button variant="contained" style={{...formInputStyle, width: 120}} onClick={onSubmit}> Add Lab </Button>
          {error
            ? <Typography style={{marginLeft: 30}} color="error">Please fill out the required fields</Typography>
            : null}
        </div>
      </div>
    </div>} topState={topInfoState} pageName="Add Lab"/>;
};
