'use strict';
const Alexa = require('alexa-sdk');

// My libraries.
const planets = require('./planets');

// Enclose your app id value in quotes, like this:  const APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = "amzn1.ask.skill.71d36534-7ccb-41d3-bc60-5ad9a858c281";
const APP_NAME = "Space Challenge";

function getFactDescription(item) {
    return `Here is your fact. ${item}`;
}

function getQuestion(counter, item) {
    return `Here is your ${counter}th question. ${item}`;
}

function getCorrectAnswerSpeech(correctObject) {
    return `This is true for ${correctObject}.`;
}

function getRandomSymbolSpeech(symbol) {
    return `<say-as interpret-as='spell-out'>${symbol} </say-as>`;
}

function getSpeechCon(isCorrect) {
    let speechCon = "";
    if (isCorrect) {
        return `<say-as interpret-as='interjection'>${planets.getRandom(speechConsCorrect)}! </say-as><break strength='strong'/>`;
    }
    return `<say-as interpret-as='interjection'>${planets.getRandom(speechConsWrong)} </say-as><break strength='strong'/>`;
}

const NUM_QUESTIONS = 10;

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
    "Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
    "Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
    "Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
const WELCOME_MESSAGE = "Welcome to Space Challenge!  You can ask me about any of the planets in our solar system (plus the sun and moon), or you can ask me to start a challenge. What would you like to do?";

//This is the message a user will hear when they start a challenge.
const START_QUIZ_MESSAGE = `OK. I will ask you ${NUM_QUESTIONS} questions about our Solar System.`;

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a challenge.
const EXIT_SKILL_MESSAGE = "Thank you for playing Space Challenge! Let's play again soon!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
const REPROMPT_SPEECH = "Which other planet or body in our solar system would you like to know about?";

//This is the message a user will hear when they ask Alexa for help in your skill.
const HELP_MESSAGE = "I know lots of things about our Solar System. You can ask me about a planet, the sun, or the moon, and I'll tell you what I know.  You can also test your knowledge by asking me to start a challenge.  What would you like to do?";

// Precedes a true of false question.
const TRUE_FALSE_MESSAGE = "True or False. ";

//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a challenge.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a challenge.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

// These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
// This only happens outside of a challenge.

// If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
// item in your data.
const USE_CARDS_FLAG = true;

const counter = 0;

const states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

// Core base app entry handlers.
const handlers = {
    "LaunchRequest": function () {
        this.handler.state = states.START;
        this.emitWithState("Start");
    },
    "QuizIntent": function () {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function () {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function () {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START, {
    "Start": function () {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "FactIntent": function () {
        const slots = this.event.request.intent.slots;
        const object = slots.Object.value;

        if (planets.isSupportedFactObject(object)) {
            // Say a fact.
            const item = planets.getRandomFactForObject(object);
            const factDescription = getFactDescription(item);
            console.log('factDescription', factDescription);

            if (USE_CARDS_FLAG) {
                // const imageObj = { smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item) };
                const imageObj = { smallImageUrl: null, largeImageUrl: null };

                this.response.speak(factDescription).listen(REPROMPT_SPEECH);
                this.response.cardRenderer(`Fact about ${object}`, factDescription, imageObj);
            } else {
                this.response.speak(factDescription).listen(REPROMPT_SPEECH);
            }
        } else {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
        }

        this.emit(":responseReady");
    },
    "QuizIntent": function () {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.PauseIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.StopIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function () {
        this.emitWithState("Start");
    }
});

const quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
    "Quiz": function () {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function () {
        if (this.attributes["counter"] == 0) {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        let item = planets.getRandomFact();

        // Randomly transform the fact into a false statement.
        if (Math.random() <= .3) {
            // True or false question.
            if (Math.random() <= .5) {
                const correctObject = planets.getFirstMatch(item);
                item = planets.replaceMatch(item, correctObject);
                this.attributes["answerortrue"] = correctObject;
            } else {
                this.attributes["answerortrue"] = 'true';
            }
            item = `${TRUE_FALSE_MESSAGE} ${item}`;
        } else {
            // Planet or text answer.
            const correctObject = planets.getFirstMatch(item);
            item = planets.replaceMatch(fact, "this planet or body");
            this.attributes["answerortrue"] = correctObject;
        }

        this.attributes["quizitem"] = item;
        this.attributes["counter"]++;

        const question = getQuestion(this.attributes["counter"], item);
        let speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function () {
        let response = "";
        let speechOutput = "";

        const item = this.attributes["quizitem"];
        let answerOrTrue = this.attributes['answerortrue'].toLowerCase();

        let userAnswer = this.event.request.intent.slots.Answer.value;
        console.log('userAnswer', userAnswer);

        // Validate the user answer.
        let correct = false;
        if (userAnswer) {
            userAnswer = userAnswer.toLowerCase();
            answerOrTrue = answerOrTrue.replace(/the|The/g, "");
            userAnswer = userAnswer.replace(/the|The/g, "");
            if (userAnswer.indexOf(answerOrTrue) !== -1) { // 'true' case, or answer case.
                correct = true;
            } else if (userAnswer === 'false' && answerOrTrue !== 'true') { // 'false' case
                correct = true;
            }
        }

        if (correct) {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        } else {
            response = getSpeechCon(false);
        }

        response += getCorrectAnswerSpeech(answerOrTrue);

        if (this.attributes["counter"] < NUM_QUESTIONS) {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            speechOutput = response + " " + EXIT_SKILL_MESSAGE;
            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
    },
    "AMAZON.RepeatIntent": function () {
        let question = getQuestion(this.attributes["counter"], this.attributes["quizitem"]);
        this.response.speak(question).listen(question);
        this.emit(":responseReady");
    },
    "AMAZON.StartOverIntent": function () {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function () {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function () {
        this.emitWithState("AnswerIntent");
    }
});

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};
