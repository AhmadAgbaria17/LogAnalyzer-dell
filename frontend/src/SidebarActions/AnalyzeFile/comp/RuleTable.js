import React from "react";
function RuleTable({ rules }) {
  return (
    <div className="logs-page">
      <table className="logs-table">
        
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Date</th>
            <th>Message</th>
          </tr>
        
        
          {rules.map((item, index) => (
            <tr className="rowbody" key={index}>
              <td className={item.rank.toLowerCase()}>{item.rule}</td>
              <td className={item.rank.toLowerCase()}>{item.rank}</td>
              <td className={item.rank.toLowerCase()}>{item.date}</td>
              <td className={item.rank.toLowerCase()}>{item.message}</td>
            </tr>
          ))}
      
      </table>
    </div>
  );
}


export default RuleTable;