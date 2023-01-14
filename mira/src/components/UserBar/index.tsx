import React, { useContext, useState } from "react";
import { CustomThemeContext } from "../../contexts/CustomThemeContext";
import Switch from 'react-switch'
import { AvatarA, AvatarSpan, Button, DropButton, FooterButton, LoggedUserArea, MenuList, UserArea, UserCard, UserMenu, UserMenuFooter } from "./styles";
import { MoonIcon, OptionIcon, PowerIcon, SunIcon } from "../Icons";

const UserBar: React.FC = () => {
    const themeContext = useContext(CustomThemeContext);
    const [optionsDrop, setOptionsDrop] = useState<Boolean>(false);
	const [menuDrop, setMenuDrop] = useState<Boolean>(false)
    const [userIsLogged, setUserIsLogged] = useState<Boolean>(true);

    const MenuDefault = <React.Fragment>
        <UserArea 
            className={optionsDrop ? 'drop' : 'collapse'}
            style={ userIsLogged ? {justifyContent: "flex-end"} : {}}
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

            <Button>Log In</Button>
            <Button style={{border: 0}}>Sign Up</Button>
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
					backgroundImage: 'url("http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png")'
				}}
			/>
		</LoggedUserArea>
		
		{/* User DropDown Menu */}
		<UserMenu className={menuDrop? 'active' : ''}>
			<UserCard>
				<AvatarA>
					<img src='http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png' alt='UserProfile'></img>
				</AvatarA>
				<div>Sr. Kaioh Shin</div>
			</UserCard>

			<MenuList>
				<a href="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png">Posts</a>
				<a href="http://localhost:5000/images/posts/1672953027051KaiohShin-300x300.png">Favorites</a>
			</MenuList>

			<UserMenuFooter>
				<FooterButton>
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
			{userIsLogged ? MenuLogged : MenuDefault}
		</React.Fragment>
    )
}

export default UserBar;