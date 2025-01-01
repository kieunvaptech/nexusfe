import { notification, Modal } from 'antd'
import { cloneDeep } from 'lodash-es'
import Error from 'assets/icons/error.svg'
import WarningIcon from 'components/atoms/icons/WarningIcon'
import GreenCheck from 'assets/icons/green-check-icon.svg'
import moment from 'moment'
import type { ArgsProps } from 'antd/es/notification'
import { DefaultOptionType } from 'antd/lib/select'

export function formatNumberCurrency(number: number | null | undefined): string | null {
  if (number !== null && number !== undefined) {
    if (Number.isInteger(number)) {
      return Intl.NumberFormat('vi-VI').format(number)
    }
    if (Number.isInteger(number * 10)) {
      return Intl.NumberFormat('vi-VI', { minimumFractionDigits: 1 }).format(number)
    }
    if (Number.isInteger(number * 100)) {
      return Intl.NumberFormat('vi-VI', { minimumFractionDigits: 2 }).format(number)
    }
    if (Number.isInteger(number * 1000)) {
      return Intl.NumberFormat('vi-VI', { minimumFractionDigits: 3 }).format(number)
    }
    return Intl.NumberFormat('vi-VI', { minimumFractionDigits: 4 }).format(number)
  } else {
    return null
  }
}

export function formatDateAndTime(date: string): string | null {
  if (!date) {
    return null
  }

  const newDate = new Date(date)
  if (isNaN(newDate.getTime())) {
    return null
  }

  return newDate.toLocaleString('it-IT')
}

export function formatDateString(date: string | Date | null | undefined): string | null {
  if (!date) {
    return null
  }

  let newDate: Date

  if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      return null
    }
    newDate = date
  } else {
    newDate = new Date(date)
    if (isNaN(newDate.getTime())) {
      return null
    }
  }

  return Intl.DateTimeFormat('vi-VI', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(newDate)
}

/** Format DateTime theo chuẩn ISO 8061
 *  yyyy-MM-DDTHH:mm:ssZ */
export function dateTimeFormatISOString(date: string | Date | null | undefined): string | null {
  if (!date) {
    return null
  }

  let newDate: Date

  if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      return null
    }
    newDate = date
  } else {
    newDate = new Date(date)
    if (isNaN(newDate.getTime())) {
      return null
    }
  }

  return moment(newDate)
    .toISOString()
    .replace(/\.\d{3}/, '')
}

// formatter and parser input number
export const formatterNumber = (
  val: string | number,
  { input }: { input: string },
  precision?: number,
): string | number => {
  if (!val || (isNaN(Number(input)) && !input.includes(',') && !input.includes('.'))) {
    return ''
  }
  return Number(val).toLocaleString('vi', {
    maximumFractionDigits: precision ?? 2,
  })
}

export const formatterNumberWithoutPrecision = (val: string | number): string => {
  if (!val) {
    return ''
  }
  return Number(val).toLocaleString('vi', { maximumFractionDigits: 0 })
}

export const parserNumber = (val: string | number, precision: number = 2): string | number => {
  if (
    val === null ||
    val === undefined ||
    isNaN(
      Number(
        val
          .toString()
          .replace(/[\$,\s]/g, '')
          .replace('.', ','),
      ),
    )
  ) {
    return ''
  }

  const num = parseFloat(
    val
      .toString()
      .replace(/[\$,\s]/g, '')
      .replace(',', '.'),
  )
  return num.toFixed(precision)
}

export const parserNumberCheckDecimal = (val: string | number, precision?: number): string | number => {
  if (!val || (typeof val === 'string' && isNaN(Number(val.replace(',', '.'))))) {
    return ''
  }

  let numberValue = typeof val === 'number' ? val : parseFloat(val.replace(/\$\s?|,/g, '').replace('.', '.'))

  if (isNaN(numberValue)) {
    return ''
  }

  return numberValue.toFixed(precision ?? 2)
}

export const stringToNumber = (val: string | number | null): number | null => {
  if (val && typeof val === 'string') {
    const res = val.replaceAll('.', '').replaceAll(',', '.')
    return Number(res)
  }
  if (typeof val === 'number') {
    return val
  }
  return null
}

export const messageSuccess = (config: ArgsProps) => {
  notification.open({
    placement: 'topRight',
    icon: <img src={GreenCheck} alt="Success icon" />,
    className: 'notiSuccess',
    duration: 2,
    ...config,
  })
}

export const messageError = (config: ArgsProps) => {
  notification.open({
    placement: 'topRight',
    className: 'notiError',
    duration: 3,
    icon: <img src={Error} alt="Error icon" />,
    ...config,
  })
}

export const messageWarning = (config: ArgsProps) => {
  notification.open({
    placement: 'topRight',
    icon: <WarningIcon />,
    className: 'notiWarning',
    duration: 2,
    ...config,
  })
}

export const messageSuccessDefault = (config: ArgsProps) => {
  messageSuccess(config)
}

export const messageErrorDefault = (config: ArgsProps) => {
  const _config = { ...config, message: config.message || "" }
  messageError(_config)
}

export const messageWarningDefault = (config: ArgsProps) => {
  const _config = { ...config, message: config.message || "" }
  messageWarning(_config)
}

/** validate file theo extension */
export function validateFile(file: File, listFileAble: any): boolean {
  const ex = file?.name?.split('.')?.pop()?.toLowerCase()
  if (!listFileAble?.includes(ex)) {
    messageErrorDefault({
      message: "",
    })
    return false
  }
  if (file?.size > 20 * 1024 * 1024) {
    messageErrorDefault({
      message: "",
    })
    return false
  }
  return true
}

export function validateFileV2(file: File, allowFiles: string[] = []): boolean {
  if (!file || !allowFiles.length) return false
  const fileType = file.name?.split('.')?.pop()?.toLowerCase()
  const stringAcceptFile = cloneDeep(allowFiles)
  const lastFileAccept = stringAcceptFile.pop()
  const checkedFile = stringAcceptFile?.join(', ')?.toString()

  if (fileType && !allowFiles.includes(fileType)) {
    messageError({
      message: `Không thể tải lên file đính kèm. Vui lòng đính kèm file ${checkedFile} hoặc ${lastFileAccept}.`,
    })
    return false
  }

  if (file?.size > 20 * 1024 * 1024) {
    messageError({ message: "" })
    return false
  }
  return true
}

export function truncateString(str: string, maxLength: number): string {
  // Encode the string to get its length after encoding
  const encodedLength = encodeURIComponent(str).replace(/%0A/g, '/n').length

  // If the encoded length is already within the maximum length, return the original string
  if (encodedLength <= maxLength) {
    return str
  }

  // Otherwise, find the maximum number of characters that can be included within the maxLength limit
  let truncatedString = ''
  let encodedTruncatedLength = 0
  for (const char of str) {
    const encodedCharLength = encodeURIComponent(char).replace(/%0A/g, '/n').length
    if (encodedTruncatedLength + encodedCharLength <= maxLength) {
      truncatedString += char
      encodedTruncatedLength += encodedCharLength
    } else {
      break
    }
  }

  // Return the truncated string
  return truncatedString
}

export function numberWithCommas(number: number | string): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function toLowerCaseNonAccentVietnamese(str: string) {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

export function yearsOption(priYear: number): DefaultOptionType[] {
  const yearNow = moment().year()
  let options: DefaultOptionType[] = []
  for (let index = 0; index < priYear; index++) {
    const year = yearNow - index
    options.push({
      label: year.toString(),
      value: year,
    })
  }
  return options
}
export function convertNumberToRomanNumeral(num: number): string | number {
  if (isNaN(num) || num <= 0 || num >= 4000) {
    return NaN // Roman numerals are typically between 1 and 3999
  }

  const digits = String(num).split('')
  const key = [
    ['', 'M', 'MM', 'MMM'], // Thousands
    ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // Hundreds
    ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // Tens
    ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // Units
  ]

  let roman = ''
  let i = 4 - digits.length // This calculates where to start in the key array

  for (let j = 0; j < digits.length; j++, i++) {
    roman += key[i][+digits[j]] // Append corresponding Roman numeral for each digit
  }

  return roman
}

export const customTitleRequire = (label: string) => {
  return (
    <span>
      {label} <span className="text-red-500">*</span>
    </span>
  )
}


const { confirm } = Modal;
export const showConfirm = (callback: Promise<void>) => {
  confirm({
    title: 'Xác nhận',
    content: 'Bạn chắc chắn muốn xóa?',
    okText: 'Xóa',
    cancelText: 'Quay lại',
    onOk: () => callback,
  });
};


