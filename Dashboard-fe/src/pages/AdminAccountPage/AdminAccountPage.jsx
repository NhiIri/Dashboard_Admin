import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContentProfile, WrapperContentProfile1, WrapperHeader, WrapperInput, WrapperInput1, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'

const AdminAccountPage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })

    }
    return (

        <div>
            <WrapperHeader>User Information</WrapperHeader>
           <div className='background'>
            
            <div className='body' style={{  paddingTop:'30px', height:'90%', marginBottom:'40px'}}> 
             {/* <div  style={{ height: '100%'}}> */}
              {/* <div style={{ width: '90%', margin: '20px auto', height: '80%' }}> */}
            
              <Loading isLoading={isLoading}>
                <WrapperContentProfile>

                <WrapperInput1>    
                        {avatar && (
                            <img src={avatar} style={{
                                height: '80%',
                                width: '80%',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
                        {/* <InputForm style={{ width: '350px' }} id="avatar" value={avatar} onChange={handleOnchangeAvatar} /> */}
                        <div style={{display:'flex', justifyContent:'center'}}>
                          {/* <WrapperLabel htmlFor="avatar">Avatar:</WrapperLabel> */}
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button style={{color:'#E57098', marginRight:'20px',}} icon={<UploadOutlined />}type="primary" danger ghost >Select File</Button>
                        </WrapperUploadFile>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',                  
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#E57098', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>  
                        </div>
                        
                    </WrapperInput1>

                    <WrapperContentProfile1>
                     <WrapperInput>
                        <WrapperLabel htmlFor="name">Name:</WrapperLabel>
                        <InputForm style={{ width: '320px', fontSize:'16px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                                
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#E57098', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email:</WrapperLabel>
                        <InputForm style={{ width: '320px' , fontSize:'16px'}} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#E57098', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone:</WrapperLabel>
                        <InputForm style={{ width: '320px' , fontSize:'16px'}} id="email" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px'
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#E57098', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address:</WrapperLabel>
                        <InputForm style={{ width: '320px' , fontSize:'16px'}} id="address" value={address} onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '2px 6px 6px',                
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#E57098', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    </WrapperContentProfile1>

                </WrapperContentProfile>
            </Loading>
            </div>
         </div>  
        </div>
       
        
    )
}

export default AdminAccountPage