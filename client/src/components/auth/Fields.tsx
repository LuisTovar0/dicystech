import React, {useId, useState} from "react";
import './auth.css';

export type State = [string, React.Dispatch<React.SetStateAction<string>>];
export type FieldInfo = { name: string, id: string, input: State }

export const fieldInfoBoilerplate = (fieldNames: string[]): FieldInfo[] => {
  return fieldNames.map(name => ({name, id: useId(), input: useState('')}));
};

export default function Fields({fields}: { fields: FieldInfo[] }) {
  const rows = fields.map(({id, input, name}) => {
    const [inputValue, setInput] = input;
    return (
      <tr key={id}>
        <td align="left">{name}</td>
        <td><input id={id} type={name.includes('password') ? 'password' : ''} value={inputValue}
          //@ts-ignore
                   onInput={event => setInput(event.target.value)}/></td>
      </tr>
    );
  });

  return (
    <table className="field">
      <tbody>{rows}</tbody>
    </table>
  );
}