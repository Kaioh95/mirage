import React, { useContext, useState } from "react";
import { CustomThemeContext } from "../../contexts/CustomThemeContext";
import Switch from 'react-switch'
import { AvatarA, AvatarSpan, Button, DropButton, FooterButton, LoggedUserArea, MenuList, UserArea, UserCard, UserMenu, UserMenuFooter } from "./styles";
import { MoonIcon, OptionIcon, PowerIcon, SunIcon, UserIcon } from "../Icons";
import { UserContext, UserResponse } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import usePersistedState from "../../hooks/usePersistedState";

const UserBar: React.FC = () => {
	const navigate = useNavigate();
    const themeContext = useContext(CustomThemeContext);
	const { isUserLogged, signOut } = useContext(UserContext);
    const [optionsDrop, setOptionsDrop] = useState<Boolean>(false);
	const [menuDrop, setMenuDrop] = useState<Boolean>(false);
	const [user] = usePersistedState<UserResponse>('user', {_id:'',name:'',email:''})
    //const [userIsLogged, setUserIsLogged] = useState<Boolean>(true);

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
				<a href="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png">Posts</a>
				<a href="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png">Favorites</a>
				<a href="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png">Comments</a>
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