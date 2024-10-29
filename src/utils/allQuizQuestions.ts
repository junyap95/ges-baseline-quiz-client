type QuestionStyles =
  | "multiple_choice_question"
  | "drag_and_drop"
  | "matching"
  | "fill_in_the_blank"
  | "dummy";

interface BaseQuestion {
  question_number: string;
  question_text: string;
  question_style: QuestionStyles;
  image?: string;
  hint: string;
}

// MCQ-specific interface
export interface MCQtype extends BaseQuestion {
  question_style: "multiple_choice_question";
  possible_answers: string[]; // Array of possible options for MCQ
  correct_answer: string; // Correct answer should be a string
}

// Drag-and-Drop-specific interface
export interface DndType extends BaseQuestion {
  question_style: "drag_and_drop";
  possible_answers: string[];
  correct_answer: string[]; // Correct answers for drag-and-drop can be an array of strings
  no_of_ans_box?: number;
}

// Matching-specific interface
export interface MatchType extends BaseQuestion {
  question_style: "matching";
  correct_answer: { [key: string]: string }; // Array of option-answer pairs
  options: string[];
  answers: string[];
}

// Fill-in-the-Blanks-specific interface
export interface FillBlankType extends BaseQuestion {
  question_style: "fill_in_the_blank";
  correct_answer: string[];
  display_info: string;
  num_of_text_box: number;
  placeholders?: string[];
  capitalisation: boolean /** does capitalisation matter for this question? */;
}

export interface DummyType extends BaseQuestion {
  question_style: "dummy";
  correct_answer: string;
  question_number: string;
  hint: string;
}

// Union type for all question styles
export type Question = MCQtype | DndType | MatchType | FillBlankType | DummyType;

export interface QuizQuestions {
  [key: string]: Question[];
}

export const numeracy_questions: QuizQuestions = {
  el1: [
    {
      question_number: "num_l1_1",
      question_text: "Which of the following is a good way to improve your math skills?",
      question_style: "multiple_choice_question",
      correct_answer: "Practising every day",
      possible_answers: [
        "Practising every day",
        "Playing video games",
        "Sleeping more",
        "Skipping maths lessons",
      ],
      hint: "Good habits, like reviewing mistakes and trying again, often lead to better performance.",
    },
    {
      question_number: "num_l1_2",
      question_text:
        "If you have 5 apples and you pick 3 more from a tree, how many apples do you have in total?",
      question_style: "multiple_choice_question",
      correct_answer: "8",
      possible_answers: ["8", "7", "6", "9"],
      hint: "Start by counting how many apples you have, then add the new ones one by one.",
    },
    {
      question_number: "num_l1_3",
      question_text:
        "You have a bag with 3 red balls, 2 blue balls, and 1 yellow ball. If you pick one ball at random, what colour are you most likely to pick?",
      question_style: "multiple_choice_question",
      correct_answer: "Red🔴",
      possible_answers: ["Red🔴", "Blue🔵", "Yellow🟡", "Green🟢"],
      hint: "Sort the colours in groups before deciding which is the most common.",
    },
    {
      question_number: "num_l1_4",
      question_text:
        "You have 3 big red apples, 2 small green apples, and 1 big green apple. Which group has the most apples?",
      question_style: "multiple_choice_question",
      correct_answer: "Big apples",
      possible_answers: ["Big apples", "Small apples", "Green apples", "Red apples"],
      hint: "Focus on the size of the apples and count how many are big.",
    },
    {
      question_number: "num_l1_5",
      question_text: 'Put these numbers in order (from biggest to smallest) in words. e.g. "Ten"',
      question_style: "fill_in_the_blank",
      correct_answer: ["TEN", "NINE", "SEVEN", "FIVE", "THREE", "ONE"],
      display_info: "3, 1, 5, 10, 9, 7",
      num_of_text_box: 6,
      capitalisation: false,
      hint: "Try to write and sort the digits down on paper first!",
    },
    {
      question_number: "num_l1_6",
      question_text: "Put these numbers in ascending order (from smallest to biggest)",
      possible_answers: ["3", "7", "4", "1", "5", "8", "10", "9", "2", "6"],
      question_style: "drag_and_drop",
      correct_answer: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      no_of_ans_box: 10,
      hint: "Keep counting from 1 to check you haven't left any numbers out!",
    },
    {
      question_number: "num_l1_7",
      question_text:
        "You have 20 balloons at a party but 8 of them pop. How many balloons are still floating?",
      question_style: "multiple_choice_question",
      correct_answer: "12",
      possible_answers: ["28", "20", "8", "12"],
      hint: "Start with the bigger number and count backwards when subtracting.",
    },
    {
      question_number: "num_l1_8",
      question_text: "You had 12 marbles, but you lost 7. How many marbles do you have now?",
      question_style: "multiple_choice_question",
      correct_answer: "5",
      possible_answers: ["4", "5", "6", "7"],
      hint: "Start with the bigger number and count backwards when subtracting.",
    },
    {
      question_number: "num_l1_9",
      question_text: "Which of the following holds the most liquid?",
      question_style: "multiple_choice_question",
      correct_answer: "A bucket🪣",
      possible_answers: ["A cup☕️", "A bowl🥣", "A teaspoon🥄", "A bucket🪣"],
      hint: "Try to imagine pouring water in each of the items.",
    },
    {
      question_number: "num_l1_10",
      question_text: "Which is likely to be longer: a pencil✏️ or a paperclip📎?",
      question_style: "multiple_choice_question",
      correct_answer: "Pencil✏️",
      possible_answers: ["Pencil✏️", "Paperclip📎", "They are the same length", "Can\u2019t tell"],
      hint: "Try to imagine what a pencil and a paperclip look like. Which one looks longer?",
    },
    {
      question_number: "num_l1_11",
      question_text: "Which object is likely to weigh more?",
      question_style: "multiple_choice_question",
      correct_answer: "A brick",
      possible_answers: ["A feather", "A brick", "A balloon", "A leaf"],
      hint: "If they weigh more, it means they are the heaviest to lift.",
    },
    {
      question_number: "num_l1_12",
      question_text: "If you place a toy on top of the table, where is the toy now?",
      question_style: "multiple_choice_question",
      correct_answer: "On top of the table",
      possible_answers: [
        "Under the table",
        "On top of the table",
        "Next to the table",
        "Behind the table",
      ],
      hint: "Read carefully to find the location of the item.",
    },
    {
      question_number: "num_l1_13",
      question_text: "What shape is a football⚽️?",
      question_style: "multiple_choice_question",
      correct_answer: "Sphere",
      possible_answers: ["Square", "Triangle", "Sphere", "Cube"],
      hint: "Cross off the shapes you are confident are wrong.",
    },
    {
      question_number: "num_l1_14",
      question_text:
        "You\u2019re organising a birthday party. If you invite five friends and three more decide to come, how many friends will be at the party?",
      question_style: "multiple_choice_question",
      correct_answer: "8",
      possible_answers: ["6", "7", "8", "9"],
      hint: "Start by adding the friends you invited first, then add the others who decided to come later.",
    },
    {
      question_number: "num_l1_15",
      question_text: "How many weeks are there in a year?",
      question_style: "multiple_choice_question",
      correct_answer: "52",
      possible_answers: ["52", "50", "12", "4"],
      hint: "Think about how many weeks are in each month and multiply that by 12 months.",
    },
    {
      question_number: "num_l1_16",
      question_text: "How many months are there in a year?",
      question_style: "multiple_choice_question",
      correct_answer: "12",
      possible_answers: ["12", "10", "52", "7"],
      hint: "Can you think of how many months are in a calendar?",
    },
    {
      question_number: "num_l1_17",
      question_text: "Which of the following contains a day, a month, and a season?",
      question_style: "multiple_choice_question",
      correct_answer: "Wednesday, September, Autumn",
      possible_answers: [
        "January, March, June",
        "Summer, Spring, Winter",
        "Sunday, Monday, Autumn",
        "Wednesday, September, Autumn",
      ],
      hint: "Look for one option that includes a day of the week, a month, and a season.",
    },
    {
      question_number: "num_l1_18",
      question_text:
        "If you have a \u00a310 note and you buy a toy for \u00a36, how much money will you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a34",
      possible_answers: ["\u00a32", "\u00a33", "\u00a34", "\u00a35"],
      hint: "To solve money problems, think about how much you start with and subtract what you spend.",
    },
    {
      question_number: "num_l1_19",
      question_text:
        "Your favourite TV show starts at 3 o\u2019clock in the afternoon. What time will it be when the show ends if it lasts for 2 hours?",
      question_style: "multiple_choice_question",
      correct_answer: "5 o\u2019clock",
      possible_answers: ["4 o\u2019clock", "5 o\u2019clock", "6 o\u2019clock", "7 o\u2019clock"],
      hint: "Start at 3 o’clock and add 2 hours to find the end time.",
    },
    {
      question_number: "num_l1_20",
      question_text:
        "You have 3 coins: a 5p, a 2p, and a 1p coin. How much money do you have in total?",
      question_style: "multiple_choice_question",
      correct_answer: "8p",
      possible_answers: ["7p", "8p", "9p", "10p"],
      hint: "Add numbers step by step. Start with the first two and work your way through.",
    },
  ],
  el2: [
    {
      question_number: "num_l2_1",
      question_text: "What is the sum of 18 + 6?",
      question_style: "multiple_choice_question",
      correct_answer: "24",
      possible_answers: ["22", "23", "24", "25"],
      hint: "Try adding the two numbers carefully, starting with 18 and counting up by 6.",
    },
    {
      question_number: "num_l2_2",
      question_text: "Which of the following represents half of a pizza?",
      question_style: "multiple_choice_question",
      correct_answer: "1/2",
      possible_answers: ["1/3", "1/4", "1/2", "2/3"],
      hint: "Think about how you would divide a pizza evenly between two people.",
    },
    {
      question_number: "num_l2_3",
      question_text:
        "If you survey your group of friends and four of them like football, three like basketball, and five like tennis, which sport is the most popular?",
      question_style: "multiple_choice_question",
      correct_answer: "Tennis",
      possible_answers: ["Football", "Basketball", "Tennis", "All are equally popular"],
      hint: "Which sport has the highest number of people who like it?",
    },
    {
      question_number: "num_l2_4",
      question_text:
        "You have \u00a325. You buy a toy for \u00a315. How much money do you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a310.00",
      possible_answers: ["\u00a340.00", "\u00a315.00", "\u00a325.00", "\u00a310.00"],
      hint: "Think about how much you started with and how much you spent. Subtract the amount you spent from the total.",
    },
    {
      question_number: "num_l2_5",
      question_text:
        "If the temperature is 25\u00b0C and it drops by 10\u00b0C, what is the new temperature?",
      question_style: "multiple_choice_question",
      correct_answer: "15\u00b0C",
      possible_answers: ["10\u00b0C", "15\u00b0C", "20\u00b0C", "35\u00b0C"],
      hint: "If the temperature goes down, you need to subtract. Start with 25 and take away 10.",
    },
    {
      question_number: "num_l2_6",
      question_text: "What is 7 x 6 ?",
      question_style: "multiple_choice_question",
      correct_answer: "42",
      possible_answers: ["13", "42", "48", "49"],
      hint: "Multiplication means repeated addition. Try adding 7 six times.",
    },
    {
      question_number: "num_l2_7",
      question_text: "Which of the following objects is likely to be about 1 metre long?",
      question_style: "multiple_choice_question",
      correct_answer: "A desk",
      possible_answers: ["A compass", "A desk", "A calculator", "A pencil"],
      hint: "Think about the size of everyday objects. Which one is closest to 1 metre?",
    },
    {
      question_number: "num_l2_8",
      question_text:
        "You have a \u00a310 note. You buy an item for \u00a34.25. How much change should you get back?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a35.75",
      possible_answers: ["\u00a34.25", "\u00a35.25", "\u00a35.50", "\u00a35.75"],
      hint: "Subtract the cost of the item from £10 to find out how much change you should get.",
    },
    {
      question_number: "num_l2_9",
      question_text: "What is the name of a 3D shape with 6 square faces?",
      question_style: "multiple_choice_question",
      correct_answer: "Cube",
      possible_answers: ["Sphere", "Cone", "Cube", "Cylinder"],
      hint: "Think about a box or a dice. What shape are the faces?",
    },
    {
      question_number: "num_l2_10",
      question_text:
        "If you divide 16 apples equally between 4 friends, how many apples does each friend get?",
      question_style: "multiple_choice_question",
      correct_answer: "4",
      possible_answers: ["3", "4", "5", "6"],
      hint: "Try drawing 16 apples on a piece of paper and how you would split it fairly amongst your friends.",
    },
    {
      question_number: "num_l2_11",
      question_text: "Which is heavier: a kilogram of feathers or a kilogram of rocks?",
      question_style: "multiple_choice_question",
      correct_answer: "They weigh the same",
      possible_answers: ["The feathers", "The rocks", "They weigh the same", "Can\u2019t tell"],
      hint: "Don't be deceived by the looks of the objects!",
    },
    {
      question_number: "num_l2_12",
      question_text:
        "If the clock shows 11:30 a.m., and your lunch break is 1 hour later, what time will it be when your break starts?",
      question_style: "multiple_choice_question",
      correct_answer: "12.30 pm",
      possible_answers: ["12.30 pm", "12.30 am", "12.00 am", "11.30 pm"],
      hint: "Add 1 hour to 11:30 am. Take note of 'am' and 'pm'",
    },
    {
      question_number: "num_l2_13",
      question_text: "What is 0.25 as a fraction?",
      question_style: "multiple_choice_question",
      correct_answer: "1/4",
      possible_answers: ["1/3", "1/2", "1/4", "2/3"],
      hint: "Think of a pizza. How many quarters make up a whole?",
    },
    {
      question_number: "num_l2_14",
      question_text: "How many 50p coins do you need to make \u00a32?",
      question_style: "multiple_choice_question",
      correct_answer: "4",
      possible_answers: ["2", "3", "4", "5"],
      hint: "How many 50p coins add up to £1? Now double that.",
    },
    {
      question_number: "num_l2_15",
      question_text: "From the bar graph, who read the most books?",
      question_style: "multiple_choice_question",
      correct_answer: "Tom",
      possible_answers: ["Sarah", "John", "Tom", "Can\u2019t tell"],
      hint: "Look for the largest number of books read.",
      image: "num_l2_15.png",
    },
  ],
  el3: [
    {
      question_number: "num_l3_1",
      question_text: "What is half of 16?",
      question_style: "multiple_choice_question",
      correct_answer: "8",
      possible_answers: ["6", "7", "8", "9"],
      hint: "Split 16 into 2 equal parts.",
    },
    {
      question_number: "num_l3_2",
      question_text:
        "A store had 45 bicycles. They sold 18 in one day. How many bicycles are left in the store?",
      question_style: "multiple_choice_question",
      correct_answer: "27",
      possible_answers: ["24", "29", "28", "27"],
      hint: "Start with 45 bicycles and subtract the 18 that were sold.",
    },
    {
      question_number: "num_l3_3",
      question_text:
        "If 12 people like football, 8 people like basketball, and 5 people like tennis, which sport is the least popular?",
      question_style: "multiple_choice_question",
      correct_answer: "Tennis",
      possible_answers: ["Football", "Basketball", "Tennis", "All are equally popular"],
      hint: "Look for the sport with the fewest people who like it.",
    },
    {
      question_number: "num_l3_4",
      question_text: "How many centimetres are in a metre?",
      question_style: "multiple_choice_question",
      correct_answer: "100",
      possible_answers: ["10", "50", "100", "1000"],
      hint: "Half a metre is equal to 50 centimetres! Now double that.",
    },
    {
      question_number: "num_l3_5",
      question_text:
        "If a bag of flour weighs 2 kilograms and a bag of sugar weighs 3 kilograms, what is the total weight of both bags?",
      question_style: "multiple_choice_question",
      correct_answer: "5 kg",
      possible_answers: ["4 kg", "5 kg", "6 kg", "7 kg"],
      hint: "Combine the weight of the flour and the sugar.",
    },
    {
      question_number: "num_l3_6",
      question_text:
        "You have \u00a315. You spend \u00a36.50 on a book and \u00a33.25 on lunch. How much money do you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a35.25",
      possible_answers: ["\u00a35.25", "\u00a35.50", "\u00a35.75", "\u00a36.00"],
      hint: "Subtract both amounts from £15 one by one.",
    },
    {
      question_number: "num_l3_7",
      question_text: "What is the result of 15 \u00d7 6?",
      question_style: "multiple_choice_question",
      correct_answer: "90",
      possible_answers: ["80", "90", "95", "100"],
      hint: "Multiplication means repeated addition. Add 15 six times.",
    },
    {
      question_number: "num_l3_8",
      question_text:
        "If you have to arrive by 1:30 pm and the journey takes 2 hours, what time do you need to leave?",
      question_style: "multiple_choice_question",
      correct_answer: "11.30 am",
      possible_answers: ["11.30 am", "11.30 pm", "11.00 am", "11.00 pm"],
      hint: "Subtract 2 hours from the arrival time. Take note of 'am' and 'pm'",
    },
    {
      question_number: "num_l3_9",
      question_text: "Which shape has 4 equal sides and 4 right angles?",
      question_style: "multiple_choice_question",
      correct_answer: "Square",
      possible_answers: ["Triangle", "Rectangle", "Rhombus", "Square"],
      hint: "Think of a shape that has all sides the same length and has four corners with right angles.",
    },
    {
      question_number: "num_l3_10",
      question_text: "What is 0.6 as a fraction?",
      question_style: "multiple_choice_question",
      correct_answer: "3/5",
      possible_answers: ["1/2", "3/5", "1/6", "2/3"],
      hint: "Change 0.6 to a fraction. Do you need to simplify it?",
    },
    {
      question_number: "num_l3_11",
      question_text: "What is the sum of 45 + 32?",
      question_style: "multiple_choice_question",
      correct_answer: "77",
      possible_answers: ["76", "77", "78", "79"],
      hint: "Add the two numbers together.",
    },
    {
      question_number: "num_l3_12",
      question_text: "How much longer did Lucas study than Emily?",
      question_style: "multiple_choice_question",
      correct_answer: "7 hours",
      possible_answers: ["7 hours", "23 hours", "3 hours", "4 hours"],
      hint: "Subtract the number of hours Emily studied from the number of hours Lucas studied.",
      image: "num_l3_12.png",
    },
  ],
};

export const literacy_questions: QuizQuestions = {
  el1: [
    {
      question_number: "lit_l1_1",
      question_text: "If your friend says, \u201cPlease close the door,\u201d what should you do?",
      question_style: "multiple_choice_question",
      correct_answer: "Close the door",
      possible_answers: ["Open the door", "Close the door", "Leave the room", "Ignore the request"],
      hint: "When someone politely asks you to follow a request, should you do what they ask?",
    },
    {
      question_number: "lit_l1_2",
      question_text:
        "If you are having a conversation with someone, what is a good way to show that you are listening?",
      question_style: "multiple_choice_question",
      correct_answer: "Stay quiet and nod when they speak",
      possible_answers: [
        "Talk over them",
        "Stay quiet and nod when they speak",
        "Walk away",
        "Interrupt them",
      ],
      hint: "Are you a good listener? What do you do to show someone you are listening to them?",
    },
    {
      question_number: "lit_l1_3",
      question_text: "How would you tell someone your name?",
      question_style: "multiple_choice_question",
      correct_answer: "Speak clearly and say, \u201cMy name is [your name]\u201d",
      possible_answers: [
        "Write it down",
        "Speak clearly and say, \u201cMy name is [your name]\u201d",
        "Stay quiet",
        "Whisper it",
      ],
      hint: "How does a conversation become a two-way chat? Do they respond by writing something or whispering?",
    },
    {
      question_number: "lit_l1_4",
      question_text:
        "If you are given the instruction, \u201cTurn left at the next corner,\u201d what should you do?",
      question_style: "multiple_choice_question",
      correct_answer: "Turn left at the next corner",
      possible_answers: [
        "Turn right at the next corner",
        "Turn left at the next corner",
        "Keep walking straight",
        "Stop walking",
      ],
      hint: "Look carefully at the instruction. Is there a direction noted in the instruction?",
    },
    {
      question_number: "lit_l1_5",
      question_text: "Which day of the week comes after Thursday?",
      question_style: "multiple_choice_question",
      correct_answer: "Friday",
      possible_answers: ["Friday", "Sunday", "Monday", "Saturday"],
      hint: "Try saying the days of the week in order. What day is it today? What day is it tomorrow?",
    },
    {
      question_number: "lit_l1_6",
      question_text: "Place these months of the year into order.",
      question_style: "drag_and_drop",
      correct_answer: ["January", "March", "July", "December"],
      possible_answers: ["July", "March", "December", "January"],
      no_of_ans_box: 4,
      hint: "Try saying the months of the year in order. What month is it currently? What month has just past or what month comes after this one?",
    },
    {
      question_number: "lit_l1_7",
      question_text: "Identify the correct spelling of the season.",
      question_style: "multiple_choice_question",
      correct_answer: "Summer",
      possible_answers: ["Summer", "Sumer", "Sommer", "Summor"],
      hint: "Try sounding the word out if you need to. ",
    },
    {
      question_number: "lit_l1_8",
      question_text:
        "A food menu has a list of starters, mains, desserts and drinks. Where would I look to see if they served ice cream?",
      question_style: "multiple_choice_question",
      correct_answer: "Desserts",
      possible_answers: ["Desserts", "Drinks", "Mains", "Starters"],
      hint: "Have you been to a restaurant recently? Picture the menu and where the ice cream may have been. ",
    },
    {
      question_number: "lit_l1_9",
      question_text: "What is the main purpose of a road sign?",
      question_style: "multiple_choice_question",
      correct_answer: "To provide instructions and safety information.",
      possible_answers: [
        "To provide instructions and safety information.",
        "To decorate the roadside.",
        "To advertise local businesses.",
        "To showcase artistic designs.",
      ],
      hint: "Think of some of the road signs you saw on your trip here today. What did they tell you?",
    },
    {
      question_number: "lit_l1_10",
      question_text:
        "Here is an example of a bus timetable. What time does Bus 25 arrive at Maple Drive?",
      question_style: "multiple_choice_question",
      correct_answer: "11:00 AM",
      possible_answers: ["11:00 AM", "8:00 AM", "10.30AM", "12 noon"],
      image: "lit_l1_10.png",
      hint: "Start by finding Maple Drive on the bus timetable. Now follow across with your finger to where the 'X' is. ",
    },
    {
      question_number: "lit_l1_11",
      question_text: "What is the next letter in this upper case alphabet?",
      question_style: "fill_in_the_blank",
      correct_answer: ["B"],
      display_info: "A _ C D E F G",
      num_of_text_box: 1,
      capitalisation: true,
      hint: "Try saying the alphabet out loud to help you!",
    },
    {
      question_number: "lit_l1_12",
      question_text: "Identity the sentence with the correct spelling.",
      question_style: "multiple_choice_question",
      correct_answer: "He is thirteen today.",
      possible_answers: [
        "He is thirteen today.",
        "He is thirten today.",
        "He is thireen today.",
        "He is thirteene today.",
      ],
      hint: "Check for common spelling mistakes like extra or missing letters.",
    },
    {
      question_number: "lit_l1_13",
      question_text: "Which of these sentences contains both a noun and a verb.",
      question_style: "multiple_choice_question",
      correct_answer: "I went for a run in the park.",
      possible_answers: [
        "I went for a run in the park.",
        "I went for a run.",
        "I like running.",
        "Exercise is good for you.",
      ],
      hint: "A noun is a thing or a person, and a verb is an action. Look for a sentence that has both.",
    },
    {
      question_number: "lit_l1_14",
      question_text: "Fill in the missing letters to spell this word correctly. Wa _ _ h ⌚️",
      question_style: "drag_and_drop",
      correct_answer: ["tc"],
      possible_answers: ["tc", "ts", "ch", "sh"],
      no_of_ans_box: 1,
      hint: "Sound out each of the options!",
    },
    {
      question_number: "lit_l1_15",
      question_text: "If you see a red circle with a line through it on a sign, what does it mean?",
      question_style: "multiple_choice_question",
      correct_answer: "No entry or something is not allowed",
      possible_answers: [
        "You can do whatever you want",
        "No entry or something is not allowed",
        "It means \u201center here\u201d",
        "It\u2019s just a decoration",
      ],
      hint: "Think about where you may see this sign on the road. Does that help you to identify its role?",
    },
    {
      question_number: "lit_l1_16",
      question_text: "Match the punctuation marks to their correct name.",
      question_style: "matching",
      correct_answer: {
        "Full Stop": ".",
        "Exclamation Mark": "!",
        "Question Mark": "?",
        Comma: ",",
      },
      options: ["Full Stop", "Exclamation Mark", "Question Mark", "Comma"],
      answers: [".", "!", "?", ","],
      hint: "Start with the punctuation marks that you do know. This may help you through the process of elimination.",
    },
    {
      question_number: "lit_l1_17",
      question_text: "Select the correct opening for a letter written to John.",
      question_style: "multiple_choice_question",
      correct_answer: "Dear John",
      possible_answers: ["Dear John", "Deer John", "Dear Jon", "dear John"],
      hint: "Look at how the name is spelt in the question. This will help you to eliminate some options.",
    },
    {
      question_number: "lit_l1_18",
      question_text: "Match these words to their correct definitions.",
      question_style: "matching",
      correct_answer: {
        "Naming word. A person, place or thing.": "Noun",
        "Describing word.": "Adjective",
        "An action or doing word.": "Verb",
        "A word that can replace a noun in a sentence (I)": "Pronoun",
      },
      options: [
        "Naming word. A person, place or thing.",
        "Describing word.",
        "An action or doing word.",
        "A word that can replace a noun in a sentence (I)",
      ],
      answers: ["Noun", "Adjective", "Verb", "Pronoun"],
      hint: "Think of a sentence in your head and try and pinpoint what categories each of the words belong to.",
    },
    {
      question_number: "lit_l1_19",
      question_text: "What is the correct spelling of this capital city?",
      question_style: "multiple_choice_question",
      correct_answer: "Belfast",
      possible_answers: ["Belfast", "belfast", "bellfast", "Bellfast"],
      hint: "This is a capital city. Does it need a capital letter?",
    },
    {
      question_number: "lit_l1_20",
      question_text:
        "You need to write a shopping list. Which of these lists would you bring with you to the shop?",
      question_style: "multiple_choice_question",
      correct_answer: "Apples, bread, milk",
      possible_answers: [
        "Apples, bread, milk",
        "Play, jump, run",
        "Blue, yellow, red",
        "Hello, goodbye, thanks",
      ],
      hint: "Think about some of the items in your cupboard or fridge. Do you see any of those items in any of the lists?",
    },
  ],
  el2: [
    {
      question_number: "lit_l2_1",
      question_text:
        "If your manager asks, \u201cCan you please send me the report by the end of the day?\u201d, what is an appropriate response?",
      question_style: "multiple_choice_question",
      correct_answer: "Respond politely",
      possible_answers: [
        "Ignore them",
        "Respond politely",
        "Say, \u201cDo it yourself!\u201d",
        "Walk away and do not respond",
      ],
      hint: "Think about the role of a manager in a workplace. Should you show them respect?",
    },
    {
      question_number: "lit_l2_2",
      question_text:
        "During a team meeting at work, what is the best way to participate in a group discussion?",
      question_style: "multiple_choice_question",
      correct_answer: "Listen to others, take turns speaking, and respond respectfully",
      possible_answers: [
        "Interrupt others when you have a point to make",
        "Listen to others, take turns speaking, and respond respectfully",
        "Speak over others to make sure your opinion is heard",
        "Stay silent throughout the meeting and not contribute",
      ],
      hint: "Think about how you can share your ideas and also make sure others feel heard.",
    },
    {
      question_number: "lit_l2_3",
      question_text:
        "You are asked to give a brief update on a project during a meeting. What is the best way to communicate this information?",
      question_style: "multiple_choice_question",
      correct_answer: "Use clear and concise language to explain the project's status",
      possible_answers: [
        "Speak loudly without considering others",
        "Use clear and concise language to explain the project's status",
        "Give irrelevant details and go off topic",
        "Speak very quietly so others cannot hear",
      ],
      hint: "How do you express your ideas in a way that can be understood by others?",
    },
    {
      question_number: "lit_l2_4",
      question_text:
        "Your supervisor gives you the following instructions: \u201cFirst, organise the files alphabetically, and then place them in the cabinet.\u201d What should you do first?",
      question_style: "multiple_choice_question",
      correct_answer: "Organise the files alphabetically",
      possible_answers: [
        "Place the files in the cabinet",
        "Ask for help",
        "Organise the files alphabetically",
        "Ignore the instructions",
      ],
      hint: "Is there an order in which the instructions have been given?",
    },
    {
      question_number: "lit_l2_5",
      question_text:
        "You see a sign with a red circle and a diagonal line over a cigarette. What does this sign mean?",
      question_style: "multiple_choice_question",
      correct_answer: "Smoking is prohibited",
      possible_answers: [
        "Smoking is allowed",
        "Smoking is prohibited",
        "Smoking is optional",
        "Smoking is encouraged",
      ],
      hint: "Think about the colour of the sign. Can you think of any other red signs you may see in everyday life? What do they typically mean?",
    },
    {
      question_number: "lit_l2_6",
      question_text:
        "The following four sentences contain two facts and two opinions. Label each one correctly.",
      question_style: "matching",
      correct_answer: {
        "The Walt Disney Company was founded in 1923 by Walt Disney and Roy O. Disney.": "Fact",
        "The Disney parks are the most magical theme parks in the world!": "Opinion",
        "Disney's first full-length animated feature film was Snow White and the Seven Dwarfs, released in 1937.":
          "Fact",
        "Disney creates the best animated movies for children!": "Opinion",
      },
      options: [
        "The Walt Disney Company was founded in 1923 by Walt Disney and Roy O. Disney.",
        "The Disney parks are the most magical theme parks in the world!",
        "Disney's first full-length animated feature film was Snow White and the Seven Dwarfs, released in 1937.",
        "Disney creates the best animated movies for children!",
      ],
      answers: ["Fact", "Opinion", "Fact", "Opinion"],
      hint: "An opinion contains a personal feeling.",
    },
    {
      question_number: "lit_l2_7",
      question_text:
        "The paragraph above talks about the Eiffel Tower. What was the name of the man who designed the Eiffel Tower?",
      display_info:
        "The Eiffel Tower is one of the most famous landmarks in the world. It is located in Paris, France🇫🇷, and was built in 1889 for the World’s Fair.\nStanding at 1,083 feet tall, it was the tallest man-made structure in the world at the time. The tower was designed by engineer Gustave Eiffel👷🏼. Today, it’s a popular tourist destination, attracting millions of visitors each year.",
      question_style: "fill_in_the_blank",
      correct_answer: ["Gustave Eiffel"],
      capitalisation: true,
      hint: "A name is a proper noun and must be capitalised.",
      num_of_text_box: 1,
    },
    {
      question_number: "lit_l2_8",
      question_text: "Match the words to the correct feeling definitions.",
      question_style: "matching",

      correct_answer: {
        Worried: "Anxious or uneasy about something that might happen",
        Excited: "Happy or enthusiastic about something that is about to happen",
        Frustrated: "Upset or annoyed because you are unable to achieve something",
        Stressed: "Overwhelmed because of pressure or high demands",
      },
      options: ["Worried", "Excited", "Frustrated", "Stressed"],
      answers: [
        "Anxious or uneasy about something that might happen",
        "Happy or enthusiastic about something that is about to happen",
        "Upset or annoyed because you are unable to achieve something",
        "Overwhelmed because of pressure or high demands",
      ],

      hint: "Start with the definitions you are more comfortable with and this might help you with those you are less confident with.",
    },
    {
      question_number: "lit_l2_9",
      question_text: "Place these words in alphabetical order.",
      question_style: "drag_and_drop",
      correct_answer: ["Narrow", "Necessary", "Needed", "Number"],
      possible_answers: ["Narrow", "Necessary", "Needed", "Number"],
      no_of_ans_box: 4,
      hint: "These words all begin with 'n' but you need to look at the second and third letter.",
    },
    {
      question_number: "lit_l2_10",
      question_text:
        "The old coin is very valuable to collectors. What does the word 'valuable' mean?",
      question_style: "multiple_choice_question",
      correct_answer: "Something that has significant worth.",
      possible_answers: [
        "Something that has significant worth.",
        "Something that is worthless.",
        "Something that is free.",
        "Something that is not useful or practical.",
      ],
      hint: "Can you think of any examples where you have come across the word 'valuable'?",
    },
    {
      question_number: "lit_l2_11",
      question_text: "Which word is spelled correctly for a formal work email?",
      question_style: "multiple_choice_question",
      correct_answer: "Definitely",
      possible_answers: ["Definately", "Definitely", "Defanatly", "Definetely"],
      hint: "Try sounding the word out and identifying the sounds.",
    },
    {
      question_number: "lit_l2_12",
      question_text:
        "Which of the following sentences uses correct punctuation and grammar for a formal email?",
      question_style: "multiple_choice_question",
      correct_answer: "I will send the report tomorrow morning.",
      possible_answers: [
        "i will send the report tomorrow morning.",
        "I will send the report, tomorrow morning?",
        "I will send the report tomorrow morning.",
        "I will send the report; tomorrow, morning.",
      ],
      hint: "In writing, do you have to capitalise 'i'?",
    },
    {
      question_number: "lit_l2_13",
      question_text: "Which of these is NOT a feeling or an opinion?",
      question_style: "multiple_choice_question",
      correct_answer: "He was late to the party.",
      possible_answers: [
        "He was late to the party.",
        "I feel they were late to the party.",
        "I think they were late to the party.",
        "You think they were late to the party.",
      ],
      hint: "Which of these sentences is the most factual?",
    },
    {
      question_number: "lit_l2_14",
      question_text: "Which of these sentences are punctuated correctly.",
      question_style: "multiple_choice_question",
      correct_answer: "Unfortunately, I didn't make it to my class because my bus was late.",
      possible_answers: [
        "Unfortunately, I didn't make it to my class because my bus was late.",
        "Unfortunately I didn't make it, to my class, because my bus was late.",
        "Unfortunately I, didn't make it to my class because my bus was late.",
        "Unfortunately, I didn't make it, to my class, because my bus was late.",
      ],
      hint: "Try saying the sentence out loud. Is there anywhere that you naturally take a pause/breath?",
    },
    {
      question_number: "lit_l2_15",
      question_text:
        "The word \u201cweren\u2019t\u201d is a contraction of which of these two words?",
      question_style: "multiple_choice_question",
      correct_answer: "Were not",
      possible_answers: ["Were not", "Is not", "Was not", "Do not"],
      hint: "Look closely at the word. Do any of the components from the contraction 'weren't' show up?",
    },
    {
      question_number: "lit_l2_16",
      question_text:
        "Make all of the following words plural by matching the word to the correct plural form.",
      question_style: "matching",
      correct_answer: {
        Orange: "s",
        Brush: "es",
        Baby: "ies",
        Leaf: "ves",
      },
      options: ["Orange", "Brush", "Baby", "Leaf"],
      answers: ["s", "es", "ies", "ves"],
      hint: "In order to make some of the words plural, we have to remove the last letter.",
    },
    {
      question_number: "lit_l2_17",
      question_text: "Which of the following sentences is written correctly?",
      question_style: "multiple_choice_question",
      correct_answer: "I will meet you tomorrow. We need to discuss the project.",
      possible_answers: [
        "I will meet you tomorrow, we need to discuss the project.",
        "I will meet you tomorrow. We need to discuss the project.",
        "I will meet you tomorrow we need to discuss, the project.",
        "I will meet you, tomorrow, we need to discuss the project.",
      ],
      hint: "Try saying the sentence out loud. Is there anywhere that you naturally take a pause/breath?",
    },
  ],
  el3: [
    {
      question_number: "lit_l3_1",
      question_text:
        "Your manager sends you an email asking for a report by Friday and a follow-up call with the client by Monday. What is the best way to respond?",
      question_style: "multiple_choice_question",
      correct_answer:
        "Reply to confirm you will complete both tasks and mention any potential issues",
      possible_answers: [
        "Ignore the email and complete the tasks without responding",
        "Reply to confirm you will complete both tasks and mention any potential issues",
        "Wait until Monday to respond",
        "Respond only about the report, ignoring the call request",
      ],
      hint: "How many requests is your manager asking you to complete?",
    },
    {
      question_number: "lit_l3_2",
      question_text:
        "During a work meeting, your colleague shares an idea that you disagree with. How should you contribute to the discussion?",
      question_style: "multiple_choice_question",
      correct_answer:
        "Politely explain your point of view and provide reasons for your disagreement",
      possible_answers: [
        "Interrupt and criticise their idea",
        "Politely explain your point of view and provide reasons for your disagreement",
        "Remain silent and not contribute",
        "Dismiss their idea without giving feedback",
      ],
      hint: "Disagreeing with someone is not necessarily a bad thing.",
    },
    {
      question_number: "lit_l3_3",
      question_text:
        "You are reading an article about climate change. Which of the following actions would best help you understand the writer\u2019s argument?",
      question_style: "multiple_choice_question",
      correct_answer: "Identifying the main points and supporting evidence in the article",
      possible_answers: [
        "Skimming the article quickly",
        "Ignoring unfamiliar words",
        "Identifying the main points and supporting evidence in the article",
        "Reading only the introduction and conclusion",
      ],
      hint: "What is the best way to gain understanding? Is it important to look at the entire article?",
    },
    {
      question_number: "lit_l3_4",
      question_text:
        "You see a sign in the workplace with an image of a fire extinguisher and the words \u201cFire Equipment.\u201d What does this sign indicate?",
      question_style: "multiple_choice_question",
      correct_answer: "The location of fire safety equipment",
      possible_answers: [
        "The area is a fire hazard",
        "The location of fire safety equipment",
        "A fire alarm",
        "An emergency exit",
      ],
      hint: "Do the words on the sign suggest danger?",
    },
    {
      question_number: "lit_l3_5",
      question_text: "Match the sentence to the correct tense.",
      question_style: "matching",
      correct_answer: {
        "I will go to the museum.": "Future Tense",
        "I went to the museum.": "Past Tense",
        "I am at the museum.": "Present Tense",
      },
      options: ["I will go to the museum.", "I went to the museum.", "I am at the museum."],
      answers: ["Present Tense", "Past Tense", "Future Tense"],
      hint: "Start with the tenses that you do know. This may help you through the process of elimination.",
    },
    {
      question_number: "lit_l3_6",
      question_text: "Which of the following is the correct spelling for a formal letter?",
      question_style: "multiple_choice_question",
      correct_answer: "Receive",
      possible_answers: ["Recieve", "Recive", "Receive", "Receve"],
      hint: "Have you seen this word written anywhere else? Can you visualise it written in another context?",
    },
    {
      question_number: "lit_l3_7",
      question_text: "Select the sentence with more than one clause.",
      question_style: "multiple_choice_question",
      correct_answer:
        "The sun set behind the mountains, and the sky turned a deep shade of orange.",
      possible_answers: [
        "The sun set behind the mountains, and the sky turned a deep shade of orange.",
        "The cat slept on the windowsill.",
        "The rain poured heavily all afternoon.",
        "She quickly finished her homework.",
      ],
      hint: "A clause functions as only part of a sentence. Is there a sentence with more than one part?",
    },
    {
      question_number: "lit_l3_8",
      question_text:
        "You are writing a report for your manager. Which of the following best demonstrates the correct structure for a formal report?",
      question_style: "multiple_choice_question",
      correct_answer:
        "Begin with a title, include an introduction that explains the purpose, followed by clear sections with headings, and end with a conclusion and recommendations.",
      possible_answers: [
        "Start with a greeting, followed by casual explanations, and end with \u201cThanks!\u201d",
        "Begin with a title, include an introduction that explains the purpose, followed by clear sections with headings, and end with a conclusion and recommendations.",
        "Write in short bullet points with no introduction or conclusion.",
        "Start with a question, followed by random facts, and finish with \u201cThe end.\u201d",
      ],
      hint: "Think about the formalities needed in a report? What is the best way to give your report a beginning, middle and end?",
    },
    {
      question_number: "lit_l3_9",
      question_text:
        "Select the sentence that uses the correct subject-verb agreement and consistent use of tenses, definite and indefinite articles:",
      question_style: "multiple_choice_question",
      correct_answer:
        "The ducks swam eagerly towards the edge as the little girl tossed some bread into the water.",
      possible_answers: [
        "The ducks swam eagerly towards the edge as the little girl tossed some bread into the water.",
        "The ducks swims eagerly towards the edge as the little girl tossed some bread into the water.",
        "The ducks swam eagerly towards the edge as the little girl tosses some bread into the water.",
        "The duck swim eagerly towards the edge while the little girl tossing some bread into the water.",
      ],
      hint: "Say the sentences slowly and out loud to yourself.",
    },
    {
      question_number: "lit_l3_10",
      question_text:
        "You need to write a formal letter to your local council requesting road repairs in your area. Which of the following is the most appropriate opening for your letter?",
      question_style: "multiple_choice_question",
      correct_answer:
        "To Whom It May Concern, I am writing to formally request road repairs on Elm Street due to safety concerns.",
      possible_answers: [
        "Hi there, I'm writing about some road issues in my area.",
        "To Whom It May Concern, I am writing to formally request road repairs on Elm Street due to safety concerns.",
        "Hello, can you please fix the roads?",
        "Hey, we've got some road problems that need fixing.",
      ],
      hint: "Think about the formalities of a letter. What is the best way to get your local council to listen to you?",
    },
    {
      question_number: "lit_l3_11",
      question_text: "Which sentence uses correct grammar?",
      question_style: "multiple_choice_question",
      correct_answer: "She doesn't want to go to the meeting tomorrow.",
      possible_answers: [
        "She don't want to go to the meeting tomorrow.",
        "She doesn't want to go to the meeting tomorrow.",
        "She didn't went to the meeting tomorrow.",
        "She isn't wanting to go to the meeting tomorrow.",
      ],
      hint: "Say the sentences slowly and out loud to yourself.",
    },
    {
      question_number: "lit_l3_12",
      question_text:
        "Which of the following sentences uses correct grammar and maintains verb tense consistency?",
      question_style: "multiple_choice_question",
      correct_answer: "After I finish the report, I will send it to my supervisor.",
      possible_answers: [
        "After I finish the report, I sent it to my supervisor.",
        "After I finished the report, I will send it to my supervisor.",
        "After I finish the report, I will send it to my supervisor.",
        "After I finish the report, I was sending it to my supervisor.",
      ],
      hint: "Say the sentences slowly and out loud to yourself.",
    },
  ],
};
