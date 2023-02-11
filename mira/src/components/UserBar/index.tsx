import React, { useContext, useState } from "react";
import { CustomThemeContext } from "../../contexts/CustomThemeContext";
import Switch from 'react-switch'
import { AvatarA, AvatarSpan, Button, DropButton, FooterButton, LoggedUserArea, MenuList, UserArea, UserCard, UserMenu, UserMenuFooter } from "./styles";
import { MoonIcon, OptionIcon, PowerIcon, SunIcon, UserIcon } from "../Icons";
import { UserContext, UserResponse } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import usePersistedState from "../../hooks/usePersistedState";
import { TabContext } from "../../contexts/TabContext";

const UserBar: React.FC = () => {
	const navigate = useNavigate();
    const themeContext = useContext(CustomThemeContext);
	const { isUserLogged, signOut } = useContext(UserContext);
	const { selectTab } = useContext(TabContext)

    const [optionsDrop, setOptionsDrop] = useState<Boolean>(false);
	const [menuDrop, setMenuDrop] = useState<Boolean>(false);
	const [user] = usePersistedState<UserResponse>('user', {_id:'',name:'',email:''})

    const MenuDefault = <React.Fragment>
        <UserArea 
            className={optionsDrop ? 'drop' : 'collapse'}
            style={ isUserLogged ? {justifyContent: "flex-end"} : {}}
        >
            <Switch
                onChange={themeContext.toggleTheme}
                checked={themeContext.theme.title === 'light' ? false : true}
                checkedIcon={false}
                uncheckedIcon={false}
                checkedHandleIcon={MoonIcon}
                uncheckedHandleIcon={SunIcon}
                height={20}
                width={40}
                handleDiameter={15}
                offColor='#7156a0'
                onColor='#2c2f49'
            />

            <Button onClick={e => navigate('/login')}>Log In</Button>
            <Button style={{border: 0}} onClick={e => navigate('/register')}>Sign Up</Button>
        </UserArea>

        <DropButton
            onClick={e => optionsDrop ? setOptionsDrop(false) : setOptionsDrop(true)}
            style={{
                minWidth: '30px',
                minHeight: '30px'
            }}
        >
            {OptionIcon}
        </DropButton>
    </React.Fragment>;

	const MenuLogged = <React.Fragment>
		<LoggedUserArea>
			<Switch
				onChange={themeContext.toggleTheme}
				checked={themeContext.theme.title === 'light' ? false : true}
				checkedIcon={false}
				uncheckedIcon={false}
				checkedHandleIcon={MoonIcon}
				uncheckedHandleIcon={SunIcon}
				height={20}
				width={40}
				handleDiameter={15}
				offColor='#7156a0'
				onColor='#2c2f49'
			/>
			<AvatarSpan
				onClick={e => menuDrop? setMenuDrop(false) : setMenuDrop(true)}
				style={{ 
					backgroundImage: user.image ? 
						`url("http://localhost:5000/images/users/${user.image}")`
						: ''
				}}
			>
				{user.image? '' : UserIcon}
			</AvatarSpan>
		</LoggedUserArea>
		
		{/* User DropDown Menu */}
		<UserMenu className={menuDrop? 'active' : ''}>
			<UserCard>
				<AvatarA to={`/user/${user._id}`}>
					{	user.image ?
						<img src={`http://localhost:5000/images/users/${user.image}`} alt='UserProfile'></img>
						: UserIcon
					}
				</AvatarA>
				<div>{user.name ? user.name : ' - - '}</div>
			</UserCard>

			<MenuList>
				<Link to={`/user/${user._id}`} onClick={e => selectTab("postsTab") }>Posts</Link>
				<Link to={`/user/${user._id}`} onClick={e => selectTab("favTab") }>Favorites</Link>
				<Link to={`/user/${user._id}`} onClick={e => selectTab("commentsTab") }>Comments</Link>
			</MenuList>

			<UserMenuFooter>
				<FooterButton onClick={e => signOut()}>
					<button>
						{PowerIcon}
					</button>
					Sign Out
				</FooterButton>
			</UserMenuFooter>
		</UserMenu>

	</React.Fragment>

    return (
        <React.Fragment>
			{isUserLogged ? MenuLogged : MenuDefault}
		</React.Fragment>
    )
}

export default UserBar;