import {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography} from "@mui/material";

import {AppState, Elem, State} from "../App";
import BaseComponent from "../auxiliar/BaseComponent";
import {formInputStyle} from "../../styles/authFormStyles";
import {addLabFormStyle, addLabStyle} from "../../styles/addLabStyles";
import INoIdRobotLabDto from "../../dto/lab/iNoIdLabDto";
import ILabDto from "../../dto/lab/iLabDto";
import RobotLabForm from "./RobotLabForm";
import CyberLabForm from "./CyberLabForm";
import config from "../../config";
import INoIdCyberLabDto from "../../dto/ICyberLabDto";
import {AxiosResponse} from "axios";
import dependencyInjector from "../../config/dependencyInjector";

//#region interfaces
export interface AddLabInfo {
  attemptedSubmit: boolean;
  error: boolean;
  robotDto: INoIdRobotLabDto;
  cyberDto: INoIdCyberLabDto;
  errorMessage: string;
}

export interface LabFormProps {
  topInfoState: AppState;
  addLabState: State<AddLabInfo>;
}

//#endregion interfaces

export default function AddLab({topInfoState}: { topInfoState: AppState }) {
  const [topInfo, topInfoSetter] = topInfoState;
  const navigate = useNavigate();
  const [addLabInfo, addLabInfoSetter] = useState<AddLabInfo>({
    attemptedSubmit: false, error: true,
    robotDto: {name: '', country: '', components: []},
    cyberDto: {},
    errorMessage: "Please fill out the required fields correctly"
  });

  //#region selecting lab type
  const [selectedLabType, setSelectedLabType] = useState('');
  const possibleLabTypes = {
    robot: 'Robot Lab',
    cyber: 'Cyber Lab'
  };
  let labForm: Elem | null;
  let dto: INoIdRobotLabDto | INoIdCyberLabDto | undefined;
  switch (selectedLabType) {
    case possibleLabTypes.robot:
      labForm = <RobotLabForm topInfoState={topInfoState} addLabState={[addLabInfo, addLabInfoSetter]}/>;
      dto = addLabInfo.robotDto;
      break;
    case possibleLabTypes.cyber:
      labForm = <CyberLabForm topInfoState={topInfoState} addLabState={[addLabInfo, addLabInfoSetter]}/>;
      dto = addLabInfo.cyberDto;
      break;
    default:
      labForm = null;
  }
  //#endregion

  //#region success snackbar
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
  //#endregion

  //#region submit
  const onSubmit = () => {
    addLabInfoSetter({...addLabInfo, attemptedSubmit: true});
    if (addLabInfo.error) return;

    const service = dependencyInjector.labService;
    switch (selectedLabType) {
      case possibleLabTypes.robot:
        service.addRobotLab(dto as INoIdRobotLabDto, {
          then: (r: AxiosResponse<ILabDto>) => topInfoSetter({...topInfo, snackbar: snackbar(r.data.name)})
        });
        break;
      case possibleLabTypes.cyber:
        addLabInfoSetter({...addLabInfo, errorMessage: "Sorry, not yet implemented."});
        break;
      default:
        addLabInfoSetter({...addLabInfo, errorMessage: "This button shouldn't be visible."});
        navigate(config.routes.home);
    }
  };

  // after submit and success snackbar is shown, navigate to base URL
  useEffect(() => {
    if (topInfo.snackbar?.key === snackbar().key)
      navigate('/');
  }, [topInfo.snackbar]);
  //#endregion

  return <BaseComponent elem={
    <div style={addLabStyle}>
      <div style={addLabFormStyle}>

        {/* Lab type select */}
        <FormControl style={{...formInputStyle, maxWidth: "50%", minWidth: 250}}>
          <InputLabel>Lab type</InputLabel>
          <Select label="Lab type" value={selectedLabType} onChange={e => setSelectedLabType(e.target.value as string)}>
            {Object.values(possibleLabTypes).map(labType => {
              return <MenuItem value={labType} key={labType}> {labType} </MenuItem>;
            })}
          </Select>
        </FormControl>

        {labForm}

        {/* Submit button */}
        {selectedLabType !== '' ?
          <div style={{display: 'flex', height: 60, alignItems: 'center'}}>
            <Button variant="contained" style={{...formInputStyle, width: 120}} onClick={onSubmit}> Add Lab </Button>
            {/* Error message */}
            {addLabInfo.error && addLabInfo.attemptedSubmit
              ? <Typography style={{marginLeft: 30}} color="error"> {addLabInfo.errorMessage} </Typography>
              : null}
          </div>
          : null}
      </div>
    </div>} topState={topInfoState} pageName="Add Lab"/>;
};
