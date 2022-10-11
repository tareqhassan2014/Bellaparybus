import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Redirect = (props) => {
    const {to} = props;
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, {
            replace: true,
        })

       //eslint-disable-next-line
    }, [])

    return null;
};

export default Redirect;