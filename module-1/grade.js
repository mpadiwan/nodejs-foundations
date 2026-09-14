function getGrade(score) {
    switch (true) {
        case score >= 90:
            return 'A';
        case score >= 80:
            return 'B';
        case score >= 70:
            return 'C';
        case score >= 60:
            return 'D';
        default:
            return 'F';
    }
};

console.log(getGrade(100));
console.log(getGrade(85));
console.log(getGrade(73));
console.log(getGrade(60));
console.log(getGrade(55));