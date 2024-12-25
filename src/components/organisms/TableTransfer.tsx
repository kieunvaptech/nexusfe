import { Transfer, TransferProps, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'
import { TransferItem } from 'antd/lib/transfer'
import { difference } from 'lodash-es'

interface TableTransferProps<T extends TransferItem> extends TransferProps<T> {
  leftHeader: ColumnsType<T>
  rightHeader: ColumnsType<T>
  leftDataTable: T[]
  rightDataTable: T[]
}

const TableTransfer = <T extends TransferItem>({
  leftHeader,
  rightHeader,
  leftDataTable,
  rightDataTable,
  ...restProps
}: TableTransferProps<T>) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({ direction, onItemSelectAll, onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled }) => {
      const header = (direction === 'left' ? leftHeader : rightHeader) as ColumnsType<TransferItem>
      const dataTable = direction === 'left' ? leftDataTable : rightDataTable

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows.filter((item) => !item.disabled).map(({ key }) => key)
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys)
          onItemSelectAll(diffKeys as string[], selected)
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected)
        },
        selectedRowKeys: listSelectedKeys,
      }

      return (
        <Table
          rowSelection={rowSelection}
          columns={header}
          dataSource={dataTable}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return
              onItemSelect(key as string, !listSelectedKeys.includes(key as string))
            },
          })}
          pagination={false}
        />
      )
    }}
  </Transfer>
)

export default TableTransfer
