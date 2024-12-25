interface Props {
  value?: string;
  id?: string;
  onClick: () => void;
}

const FileInTable: React.FC<Props> = ({ value, id, onClick }) => {
  return (
    <span className="text-[#1890ff] w-full inline-block" title={value}>
      <span
        onClick={() => {
          if (id) {
            // download file by id
            return;
          }
          onClick();
        }}
        className="text-decoration-underline cursor-pointer"
      >
        {value}
      </span>
    </span>
  );
};
export default FileInTable;
