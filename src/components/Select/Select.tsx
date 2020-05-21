import React from "react";
import css from "./Select.module.scss";

interface Props {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: number;
}

export default function Select({ id, label, onChange, value }: Props) {
  return (
    <div className={`${css.container} textInput`}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        className={[css.select, "textInput"].join(" ")}
        onChange={onChange}
        value={value}
      >
        <option value={0.25}>25%</option>
        <option value={0.5}>50%</option>
        <option value={0.75}>75%</option>
        <option value={1}>100%</option>
      </select>
    </div>
  );
}
