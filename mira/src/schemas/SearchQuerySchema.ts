import * as yup from "yup"

export const SearchQueryShema = yup.object().shape({
    searchQuery: yup.string().min(3).required("Required"),
})