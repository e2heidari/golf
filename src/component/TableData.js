import React from "react";

const TableData = ({ playersData }) => {
  const playersRow = playersData.map((item) => (
    <tr>
      <td>{item.pos}</td>
      <td>
        {item.first_name} {item.last_name}
      </td>
      <td>{item.total}</td>
      <td>{item.score}</td>
      <td>{item.thru}</td>
    </tr>
  ));
  return <tbody>{playersRow}</tbody>;
};
export default TableData;
