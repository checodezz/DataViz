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

    const [selectedCategory, setSelectedCategory] = useState(() =>
        query.get("selectedCategory") || getCookieValue("selectedCategory", "")
    );

    useEffect(() => {
        Cookies.set("startDate", startDate.toISOString().split("T")[0]);
        Cookies.set("endDate", endDate.toISOString().split("T")[0]);
        Cookies.set("age", selectedAge);
        Cookies.set("gender", selectedGender);
        Cookies.set("selectedCategory", selectedCategory);
    }, [startDate, endDate, selectedAge, selectedGender, selectedCategory]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("startDate", startDate.toISOString().split("T")[0]);
        params.set("endDate", endDate.toISOString().split("T")[0]);
        params.set("age", selectedAge);
        params.set("gender", selectedGender);
        if (selectedCategory) {
            params.set("selectedCategory", selectedCategory);
        }
        navigate({ search: params.toString() });
    }, [startDate, endDate, selectedAge, selectedGender, selectedCategory, navigate]);

    const resetFilters = () => {
        Cookies.remove("startDate");
        Cookies.remove("endDate");
        Cookies.remove("age");
        Cookies.remove("gender");
        Cookies.remove("selectedCategory");
        setStartDate(new Date("2022-10-04"));
        setEndDate(new Date("2022-10-11"));
        setSelectedAge("15-25");
        setSelectedGender("Male");
        setSelectedCategory("");
    };

    return {
        startDate,
        endDate,
        selectedAge,
        selectedGender,
        selectedCategory,
        setStartDate,
        setEndDate,
        setSelectedAge,
        setSelectedGender,
        setSelectedCategory,
        resetFilters,
    };
};
