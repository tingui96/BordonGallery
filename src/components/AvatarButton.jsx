import { useRef } from 'react';
import PropTypes from 'prop-types'
import { Avatar } from '@nextui-org/react';

export default function AvatarButton({user,onChange}){
    const fileInputRef = useRef(null);
    
    return (
    <>
            <Avatar style={{cursor:'pointer'}} isBordered radius="full" className="w-20 h-20" src={user?.photoUrl}
                onClick={() => fileInputRef.current.click()}>
            </Avatar>
            <input type="file" hidden accept="image/jpeg" ref={fileInputRef} onChange={onChange}>
            </input>  
    </>      
    );
}
AvatarButton.propTypes = {
    user: PropTypes.object,
    onChange: PropTypes.func
}