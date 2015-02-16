var msg, difference, vowels = 0, userSpeed, userSkill, speedResponse, speedResponseLowerCase, skillResponse, computerSpeed, computerSkill, computerCarIndex, computerCar, boxID;

var cars = ['Ford Fiesta','Chevy Sonic SS','Honda Civic Type R','Volkswagen Golf R','Tesla Model S P85D','BMW M3','Porsche GT3 RS','Lamborghini Aventador','Ferrari FXX K','Pagani Zonda R'];

var Racer = function(name, speed, skill, car) {
  this.name = name;
  this.speed = speed;
  this.skill = skill;
  this.car = car;
  this.position = 0;
  this.update = function() {
    this.position = Math.floor(this.position);
    for (var i = 1; i <= this.position; i++) {
      boxID = this.name.toLowerCase() + i.toString();
      document.getElementById(boxID).style.backgroundColor = "#44B344";
    }
    if (track.weather == "wet") {
      msgSkill = this.skill * 2;
    } else {
      msgSkill = this.skill;
    }
    msg = this.name + "!<br />" + this.car + "<br />Skill level: " + msgSkill + "/10<br />(" + track.weather + " track)";
    document.getElementById(this.name).innerHTML = msg;
  };
  this.run = function() {
    if (this.skill > (Math.random() * 10)) {
    this.position += this.speed;
    }
    if (this.position > 10) {
      this.position = 10;
    }
  };
};

var track = {
  weather: "dry",
  getCondition: function() {
    if (Math.random() > 0.5) {
      this.weather = "dry";
    } else {
      this.weather = "wet";
      user.skill = user.skill * 0.5;
      computer.skill = computer.skill * 0.5;
      document.body.style.backgroundImage = "url('images/wet.jpg')";
    }
  }
};

alert("Let's race!");
speedResponse = prompt("What kind of car will you drive?");
speedResponseLowerCase = speedResponse.toLowerCase();
for (var i = 0; i < speedResponse.length; i++) {
  if (speedResponseLowerCase[i] == 'a' || speedResponseLowerCase[i] == 'e' || speedResponseLowerCase[i] == 'i' || speedResponseLowerCase[i] == 'o' || speedResponseLowerCase[i] == 'u') {
    vowels++;
  }
}
userSpeed = vowels / speedResponse.length;
userSpeed = Math.round(userSpeed * 9)/10;
if (userSpeed === 0 || isNaN(userSpeed)) {
  userSpeed = 0.1;
  speedResponse = "Walking";
}

skillResponse = prompt("How many accidents have you been in?");
userSkill = parseInt(skillResponse, 10);
userSkill = 10 - userSkill;
if (isNaN(userSkill) || userSkill <= 0) {
  userSkill = 1;
}

var user = new Racer("You", userSpeed, userSkill, speedResponse);

computerSpeed = Math.round(Math.random() * 9)/10;
computerSkill = Math.round(Math.random() * 9) + 1;
computerCarIndex = computerSpeed * 10;
computerCar = cars[computerCarIndex];
var computer = new Racer("Computer", computerSpeed, computerSkill, computerCar);

track.getCondition();

while(computer.position < 10 && user.position < 10) {
  computer.run();
  user.run();
}

computer.update();
user.update();

difference = user.position - computer.position;
difference = Math.round(difference*10)/10;
if (difference < 0) {
  difference = difference * -1;
  msg = "You LOSE by " + difference + " laps!";
  if (computer.skill > user.skill) {
    msg += " Try improving your skill.";
  } else {
    msg += " Try improving your car.";
  }
} else {
  msg = "You WIN by " + difference + " laps!";
}
document.getElementById('result').innerHTML = msg;