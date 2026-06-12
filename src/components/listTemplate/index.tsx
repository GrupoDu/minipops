import styles from "./styles.module.scss";
import React from "react";

const ListTemplate = ({
  children,
  heads,
}: {
  children: React.ReactNode;
  heads: string[];
}) => {
  return (
    <div className="listWrapper">
      <table style={{ overflow: "scroll" }} className={styles.listTemplate}>
        <thead>
          <tr>
            {heads.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default ListTemplate;
