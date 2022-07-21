import {AppInfoSetter} from "./App";
import BaseComponent from "./auxiliar/BaseComponent";
import Fields, {fillStates} from "./auxiliar/Fields";

export default function AddLab({topInfoState}: { topInfoState: AppInfoSetter }) {
  const fields = [
    {name: 'Name'},
    {name: 'LabHash'},
    {name: 'Country', options: {choose: {list: ['Portugal', 'United Kingdom', 'Greece', 'To do: add others']}}},
    {name: 'Components', options: {choose: {pickMany: true, list: []}}},
    {name: 'Lab logo (optional)', options: {file: {}}},
    {name: 'Lab Schema (optional)', options: {file: {}}}
  ].map(fillStates);

  return (<BaseComponent topInfoState={topInfoState} elem={
    <Fields fields={fields}/>
  } pageName="Add Lab"/>);
}