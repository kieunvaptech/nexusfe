import React from 'react'
import PagingSelectionIcon from 'assets/icons/caret-down-svgrepo-com.svg'

const PAGING = [5, 10, 20, 50]

interface props {
  perPage: number
  onChangePerPage: (page: number) => void
  // onSearch?: () => void
}

const PageSelection: React.FC<props> = (props) => {
  const { perPage, onChangePerPage } = props
  const [page, setPage] = React.useState(perPage)
  const [show, setShow] = React.useState(false)
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShow(false)
    }
  }
  React.useEffect(() => {
    onChangePerPage && onChangePerPage(page)
    //   onSearch && onSearch({ size: page, page: 1 })
  }, [page])
  return (
    <button
      ref={ref}
      className="relative select-none w-[100px] font-[700] h-[36px] cursor-pointer rounded-[2px] px-2 flex items-center border-[1px] border-[#D9D9D9]"
      onClick={() => setShow(!show)}
    >
      <div className=" w-full flex-center">
        {page} /trang
        <img className="h-4 ml-2" src={PagingSelectionIcon} alt="" />
      </div>
      <div
        className="w-full absolute bottom-[40px] bg-white left-[0] shadow-xl transition overflow-hidden z-[301]"
        style={{
          height: !show ? '0' : `${PAGING.length * 36}px`,
        }}
      >
        {PAGING.map((item, index) => {
          return (
            <div
              key={index}
              className={`${item === page ? 'text-[#0F51AA]' : ''} flex hover:bg-[#E5F0FA] items-center pl-[19px] h-[36px]`}
              onClick={() => setPage(item)}
            >
              {item}
            </div>
          )
        })}
      </div>
    </button>
  )
}

export default PageSelection
