interface Props {
  color?: string;
  background?: string;
}

export const EditIcon: React.FC<Props> = (props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4158 12.915H5.66748V13.9998H12.4158V12.915Z"
        fill={props.color}
      />
      <path
        d="M4.73616 12.6215L0.867465 13.8798L0 9.90546L4.73616 12.6215Z"
        fill={props.color}
      />
      <path
        d="M5.68538 -9.73124e-06L0.000976562 9.90546L4.73665 12.6231L10.421 2.71762L5.68538 -9.73124e-06Z"
        fill={props.color}
      />
      <path
        d="M4.82971 3.73562L1.52051 9.50214L4.31383 11.1051L7.62302 5.33861L4.82971 3.73562Z"
        fill={props.background || "white"}
      />
      <path
        d="M6.18551 1.37522L5.30908 2.90247L8.1024 4.50545L8.97883 2.97821L6.18551 1.37522Z"
        fill={props.background || "white"}
      />
      <path
        d="M3.6469 11.9969L1.55701 12.677L1.08838 10.5292L3.6469 11.9969Z"
        fill={props.background || "white"}
      />
    </svg>
  );
};
