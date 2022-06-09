import {Dispatch, SetStateAction, useState} from "react";

export type FieldInfo = { name: string, input: State, options?: FieldOptions }
export type State = [string, Dispatch<SetStateAction<string>>];

// todo validate options
export interface FieldOptions {
  password?: boolean,
  choose?: { pickMany?: boolean, list: string[] },
  file?: { type?: string }
}

export interface FieldsProps {
  fields: FieldInfo[];
}

export default function Fields({fields}: FieldsProps) {
  const rows = fields.map(({input, name, options}) => {
    const [inputValue, setInput] = input;
    return (
      <tr key={name}>
        <td align="left">{name}</td>
        <td> {(() => {
          if (options?.choose) {
            if (options.choose.pickMany)
              return <div style={{fontSize: '11px'}}>Sorry, not implemented: pick many</div>;
            else
              return <select id={name} onSelect={event => {
                if (!options || !options.choose) throw `Impossible error`;
                setInput(options.choose.list[(event.target as HTMLSelectElement).selectedIndex]);
              }}> {options.choose.list.map(str => <option value={str}>{str}</option>)}</select>;
          } else if (options?.file) {
            return <input id={name} type="file"/>;
          }
          return <input id={name} type={options?.password ? 'password' : ''} value={inputValue}
                        onInput={event => setInput((event.target as HTMLInputElement).value)}/>;
        })()
        }</td>
      </tr>
    );
  });

  return (
    <table className="fields">
      <tbody>{rows}</tbody>
    </table>
  );
}

export const fillStates = ({name, options}: { name: string, options?: FieldOptions }): FieldInfo => ({
  name, options, input: useState('')
});
