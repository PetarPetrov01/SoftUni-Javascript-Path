function matchDates(text) {
    let reg = /\b(?<day>\d{2})(?<sep>[.\-\/])(?<month>[A-Z][a-z]{2})(\k<sep>)(?<year>\d{4}\b)/g

    while ((valid = reg.exec(text[0])) !==null){
        let day = valid.groups.day
        let month = valid.groups.month
        let year = valid.groups.year
        console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
    }
}
matchDates(['13/Jul/1928, 10-Nov-1934, , 01/Jan-1951,f 25.Dec.1937 23/09/1973, 1/Feb/2016'])