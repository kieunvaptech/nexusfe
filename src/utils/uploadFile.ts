import { RcFile } from 'antd/es/upload/interface'
// import { fileDinhKem } from 'components/models/Shared.model'

export const uploadFile = (file: RcFile, path: string, handleUploadFile: (arg: any) => void) => {
  const { name, type } = file
  const reader = new FileReader()

  reader.onload = (e) => {
    const binaryString = atob((e.target?.result as string).split(',')[1])
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const dataArray = Object.values(bytes)
    // const fileData: fileDinhKem = {
    //   tenFile: name,
    //   moTa: '',
    //   duongDan: path,
    //   fileType: type,
    //   trangThai: 0,
    //   data: dataArray,
    // }

    // handleUploadFile(fileData)
  }
  reader.readAsDataURL(file as Blob)
}
