import { messageErrorDefault, validateFileV2 } from "../../utils/CommonFc";
import { Button, Form, Input, Upload } from "antd";
// import { downloadFile, HTTP_METHODS } from '../../utils/request'
import { CSSProperties, useState } from "react";
import { CloseIcon } from "./icons/CloseIcon";

interface Props {
  form: any;
  listFileAble: string[];
  viewOnly?: boolean;
  accept: string;
  url?: string;
  fieldName?: string;
  customStyle?: CSSProperties;
  allowClear?: boolean;
  id?: string;
}

const FilesInput: React.FC<Props> = ({
  form,
  viewOnly,
  id,
  accept,
  listFileAble,
  url,
  fieldName = "tepDinhKem",
  customStyle,
  allowClear = true,
}) => {
  const tepDinhKem = Form.useWatch(fieldName, form);
  const [loading, setLoading] = useState(false);

  function handleClearFile() {
    form.setFieldsValue({
      [fieldName]: null,
      fileDinhKem: null,
    });
  }

  // upload file
  const handleUpload = (file: File) => {
    setLoading(true);
    validateFileV2(file, listFileAble) &&
      form.setFieldsValue({
        fileDinhKem: file,
        [fieldName]: file.name,
      });
    setLoading(false);
    return false;
  };

  // download-file
  const handleDownloadFile = (id?: string, tepDinhKem?: any) => {
    if (!tepDinhKem) {
      messageErrorDefault({
        message: "Chưa chọn tệp",
      });
      return;
    }
    const fileDinhKem = form.getFieldValue("fileDinhKem");
    if (fileDinhKem) {
      const fileLink = document.createElement("a");
      fileLink.href = URL.createObjectURL(fileDinhKem);
      fileLink.download = fileDinhKem.name;
      fileLink.click();
      fileLink.remove();
    } else {
      // download by id
      //   if (id) {
      //     downloadFile({
      //       method: HTTP_METHODS.GET,
      //       url: `${url}/${id}`,
      //     })
      //   }
    }
  };

  return (
    <Input.Group style={{ display: "flex" }}>
      <Form.Item
        style={{
          ...customStyle,
          width: viewOnly ? "calc(100%)" : "calc(100% - 100px)",
          marginRight: viewOnly ? 0 : "10px",
          marginBottom: 0,
        }}
      >
        <div
          className="upload-file text-[#f5f5f5] min-h-[38px] border-[#d9d9d9] border-[1px] rounded-[4px] px-[11px] py-[6px]"
          style={{ display: "flex" }}
        >
          <span
            className={`text-[#000] w-full inline-block hover:text-[#1890ff] ${tepDinhKem ? "cursor-pointer" : ""}`}
            title={tepDinhKem}
            onClick={() => handleDownloadFile(id, tepDinhKem)}
          >
            {tepDinhKem}
          </span>
          {tepDinhKem && !viewOnly && allowClear && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleClearFile}
            >
              <CloseIcon color="grey" />
            </span>
          )}
        </div>
      </Form.Item>
      {!viewOnly && (
        <Upload accept={accept} showUploadList={false} beforeUpload={handleUpload} maxCount={1}>
          <Button style={{ width: "90px", height: 38 }} loading={loading}>
            Chọn tệp
          </Button>
        </Upload>
      )}
    </Input.Group>
  );
};
export default FilesInput;
