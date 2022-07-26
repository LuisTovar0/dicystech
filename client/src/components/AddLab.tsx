import {AppInfoSetter} from "./App";
import BaseComponent from "./auxiliar/BaseComponent";
import {useState} from "react";
import {Button, Input} from "@mui/material";

export default function AddLab({topInfoState}: { topInfoState: AppInfoSetter }) {
  // const fields = [
  //   {name: 'Name'},
  //   {name: 'LabHash'},
  //   {name: 'Country', options: {choose: {list: ['Portugal', 'United Kingdom', 'Greece', 'To do: add others']}}},
  //   {name: 'Components', options: {choose: {pickMany: true, list: []}}},
  //   {name: 'Lab logo (optional)', options: {file: {}}},
  //   {name: 'Lab Schema (optional)', options: {file: {}}}
  // ].map(addStates);
  const fields = ['Name', 'LabHash', 'Country', 'Components', 'Lab logo (optional)', 'Lab Schema (optional)',]
    .map(name => ({name, input: useState('')}));

  return (<BaseComponent topInfoState={topInfoState} elem={<>
    <Input autoCapitalize="true"></Input>
    <Button>World</Button>
  </>} pageName="Add Lab"/>);
}