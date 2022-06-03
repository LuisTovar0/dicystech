import {AppComponentProps} from "../app/App";

export default function Home({setPageName}: AppComponentProps) {
  setPageName('Home');

  return (<div>
    You are logged in
  </div>);
}