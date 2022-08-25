import {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Snackbar, Typography} from "@mui/material";

import {AppState} from "../App";
import BaseComponent from "../auxiliar/BaseComponent";
import {formInputStyle} from "../../styles/authFormStyles";
import {addLabFormStyle, addLabStyle} from "../../styles/addLabStyles";
import LabService from "../../service/labService";
import INoIdLabDto from "../../dto/lab/iNoIdLabDto";
import ILabDto from "../../dto/lab/iLabDto";
import RobotLabForm from "./RobotLabForm";

//#region interfaces
export interface AddLabInfo {
  attemptedSubmit: boolean;
  error: boolean;
  dto: INoIdLabDto; // | IOtherLabTypeDTO
}

//#endregion interfaces

export default function AddLab({topInfoState}: { topInfoState: AppState }) {
  const [topInfo, topInfoSetter] = topInfoState;
  const navigate = useNavigate();
  const [addLabInfo, addLabInfoSetter] = useState<AddLabInfo>({
    attemptedSubmit: false, error: false,
    dto: {name: '', country: '', components: []}
  });

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
    addLabInfoSetter({...addLabInfo, attemptedSubmit: true});
    if (addLabInfo.error) return;

    const dto = addLabInfo.dto;
    if (!dto) return;

    const service = new LabService();
    service.addLab(dto, {
      then: r => {
        const data = r.data as ILabDto;
        topInfoSetter({...topInfo, snackbar: snackbar(data.name)});
      }
    });
  };

  // after submit and success snackbar is shown, navigate to base URL
  useEffect(() => {
    if (topInfo.snackbar?.key === snackbar().key)
      navigate('/');
  }, [topInfo.snackbar]);

  return <BaseComponent elem={
    <div style={addLabStyle}>
      <div style={addLabFormStyle}>

        <RobotLabForm topInfoState={topInfoState} addLabState={[addLabInfo, addLabInfoSetter]}/>

        {/* Submit button */}
        <div style={{display: 'flex', height: 60, alignItems: 'center'}}>
          <Button variant="contained" style={{...formInputStyle, width: 120}} onClick={onSubmit}> Add Lab </Button>
          {/* Error message */}
          {addLabInfo.error && addLabInfo.attemptedSubmit
            ? <Typography style={{marginLeft: 30}} color="error">
              Please fill out the required fields correctly </Typography>
            : null}
        </div>
      </div>
    </div>} topState={topInfoState} pageName="Add Lab"/>;
};
