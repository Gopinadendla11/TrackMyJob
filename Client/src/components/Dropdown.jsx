import React from "react";

export const Dropdown = (props) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const onDropDownChange = (e) => {
    setSelectedOption(e.target.value);
    props.OnSelectionChange(e.target.value);
  };
  return (
    <div>
      <select
        className=" w-full p-3 pr-3 my-3 rounded-md border-[2px] border-solid border-primary"
        placeholder="Status"
        id="options"
        value={selectedOption}
        onChange={onDropDownChange}
      >
        <option value="" disabled selected>
          {props.name}
        </option>
        {props.options.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    </div>
  );
};
