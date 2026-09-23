const user = {
  name: "Margaux Padiwan",
  role: "Developer",
  yearsOfExperience: 5,
  favoriteLanguages: ["Dart", "JavaScript", "Kotlin"]
};

console.log("Name:", user.name);
console.log("First favorite language:", user.favoriteLanguages[0]);
user.isLearningNodeJS = true;
console.log("Entire object:", user);