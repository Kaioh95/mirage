import React, { useState } from "react";
import { Field, Formik, FormikHelpers, FormikValues } from "formik";
import { DropButton, LogoArea, LogoImg, SearchButton, SearchContainer, SearchForm, SearchInput } from "./styles";
import { ChevronDown, ChevronRight, SearchIcon } from "../Icons";
import { SearchQueryShema } from "../../schemas/SearchQuerySchema";
import MiraImage from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";

interface SearchValues extends FormikValues{
    searchQuery: string
}

const LogoSearchBar: React.FC = () => {
    const [dropDown, setDropDown] = useState<Boolean>(false);
    const navigate = useNavigate();

    const onSearch = async (values: SearchValues, actions: FormikHelpers<SearchValues>) => {
        if(values.searchQuery.charAt(0) === '@')
            navigate(`/users/?q=${values.searchQuery.substring(1, values.searchQuery.length)}`)
        else
            navigate(`/?q=${values.searchQuery}`)
        navigate(0)
    }

    return(
        <React.Fragment>
            <LogoArea>
                <a href="/">
                    <LogoImg src={MiraImage} alt='Logo'></LogoImg>
                </a>
                <DropButton onClick={e => dropDown ? setDropDown(false) : setDropDown(true)}>
                    {dropDown ? ChevronDown : ChevronRight}
                </DropButton>
            </LogoArea>

            <SearchContainer className={dropDown ? 'drop' : 'collapse'} >
                <Formik
                    initialValues={{
                        searchQuery: "",
                    }}
                    validationSchema={SearchQueryShema}
                    onSubmit={onSearch}
                >
                    <SearchForm>
                        <Field 
                            name='searchQuery'
                            placeholder='Search for Images or Users'
                            as={SearchInput}/>
                        <SearchButton type="submit">
                            {SearchIcon}
                        </SearchButton>
                    </SearchForm>
                </Formik>
            </SearchContainer>
        </React.Fragment>
    )
}

export default LogoSearchBar