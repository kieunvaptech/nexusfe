import { useUserActions } from 'actions/user.action'
import Avatar from 'assets/icons/Avatar.svg'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderMain = () => {
  const navigate = useNavigate()
  const userActions = useUserActions();
  const [info, setInfo] = useState<string>()


  const handleClickLogout = async () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    getUserDetail()
  }, [])

  const getUserDetail = async () => {
    try {
      const response: any = await userActions.userDetail();
      if(response){
        setInfo(response.fullname)
      }
    } catch (error: any) {
      const phone = localStorage.getItem('phone')
      setInfo(phone || '')
    }

  }


  return (
    <header
      className={`'pl-[340px]' main-header fixed w-full top-[0] left-[0] flex justify-between pt-[14px] flex-col`}
    >
      <div className="flex justify-between h-11">
        <div className={`ml-[-12px] mb-6 mr-2 flex items-center pt-3`}>
          <div className="m-1 cursor-pointer bg-white">
          </div>
          <div className="pl-3 flex">
            <div className="flex space-x-[10px] h-[20px] pr-3">
            </div>
            <a className="text-white text-base flex items-center" href="/">
            nexus
            </a>
          </div>
        </div>
        <div className="flex relative space-x-[10px] pr-10" onClick={handleClickLogout}>
          <div className="flex space-x-[10px]">
            <img src={Avatar} alt="Avatar" />
          </div>
          <div className="profile flex h-[40px] cursor-pointer">
            <div className="flex-col text-[14px] text-white hidden lg:flex flex justify-center">
              <div className="font-bold" style={{ color: '#ffffff' }}>
                {info}
              </div>
            </div>
          </div>
          <div className="flex space-x-[10px] cursor-pointer" >
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(HeaderMain)