import './addLab.css';
import {AppInfoSetter} from "../app/App";
import BaseComponent from "../BaseComponent";

export default function AddLab({topInfoState}: { topInfoState: AppInfoSetter }) {
  return (<BaseComponent topInfoState={topInfoState} elem={
    <div>
      <table>
        <tbody>
        <tr>
          <td>Lab Name</td>
          <td><input/></td>
        </tr>
        <tr>
          <td>Country</td>
          <td><input/></td>
        </tr>
        <tr>
          <td>Hello world</td>
          <td><input/></td>
        </tr>
        </tbody>
      </table>
    </div>
  } pageName="Add Lab"/>);
}