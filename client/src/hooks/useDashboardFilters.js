import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export const useDashboardFilters = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getCookieValue = (key, defaultValue) => Cookies.get(key) || defaultValue;
    const query = new URLSearchParams(location.search);

    const [startDate, setStartDate] = useState(() =>
        query.get("startDate")
            ? new Date(query.get("startDate"))
            : new Date(getCookieValue("startDate", "2022-10-04"))
    );
    const [endDate, setEndDate] = useState(() =>
        query.get("endDate")
            ? new Date(query.get("endDate"))
            : new Date(getCookieValue("endDate", "2022-10-11"))
    );
    const [selectedAge, setSelectedAge] = useState(() =>
        query.get("age") || getCookieValue("age", "15-25")
    );
    const [selectedGender, setSelectedGender] = useState(() =>
        query.get("gender") || getCookieValue("gender", "Male")
    );

    useEffect(() => {
        Cookies.set("startDate", startDate.toISOString().split("T")[0]);
        Cookies.set("endDate", endDate.toISOString().split("T")[0]);
        Cookies.set("age", selectedAge);
        Cookies.set("gender", selectedGender);
    }, [startDate, endDate, selectedAge, selectedGender]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("startDate", startDate.toISOString().split("T")[0]);
        params.set("endDate", endDate.toISOString().split("T")[0]);
        params.set("age", selectedAge);
        params.set("gender", selectedGender);
        navigate({ search: params.toString() });
    }, [startDate, endDate, selectedAge, selectedGender, navigate]);

    const resetFilters = () => {
        Cookies.remove("startDate");
        Cookies.remove("endDate");
        Cookies.remove("age");
        Cookies.remove("gender");
        setStartDate(new Date("2022-10-04"));
        setEndDate(new Date("2022-10-11"));
        setSelectedAge("15-25");
        setSelectedGender("Male");
    };

    return {
        startDate,
        endDate,
        selectedAge,
        selectedGender,
        setStartDate,
        setEndDate,
        setSelectedAge,
        setSelectedGender,
        resetFilters,
    };
};
