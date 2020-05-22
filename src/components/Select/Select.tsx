import React from "react";
import css from "./Select.module.scss";

interface Props {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: number;
  placeholder?: string;
  helpText?: string;
}

export default function Select({
  id,
  label,
  onChange,
  value,
  placeholder,
  helpText,
}: Props) {
  return (
    <div className={`${css.container} inputElement`}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <div className={css.selectContainer}>
        <select id={id} name={id} onChange={onChange} value={value}>
          <option value={0} disabled selected className={css.firstOption}>
            {placeholder}
          </option>
          <option value={0.25}>25%</option>
          <option value={0.5}>50%</option>
          <option value={0.75}>75%</option>
          <option value={1}>100%</option>
        </select>
      </div>
      <p className={css.helpText}>{helpText}</p>
    </div>
  );
}
