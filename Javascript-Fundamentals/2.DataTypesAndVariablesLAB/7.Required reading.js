function requiredReading(numberOfPages, pagesPerHour, readDays) {
    let totalTime = numberOfPages / pagesPerHour;
    let hoursPerDay = totalTime / readDays
    console.log(`${hoursPerDay}`);
}
requiredReading(212, 20, 2)