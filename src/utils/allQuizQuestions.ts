interface BaseQuestion {
  question_number: string;
  question_text: string;
  question_style: "multiple_choice_question" | "drag_and_drop" | "matching" | "fill_in_the_blanks";
  image?: string;
}

// MCQ-specific interface
interface MultipleChoiceQuestion extends BaseQuestion {
  question_style: "multiple_choice_question";
  possible_answers: string[]; // Array of possible options for MCQ
  correct_answer: string; // Correct answer should be a string
}

// Drag-and-Drop-specific interface
export interface DragAndDropQuestion extends BaseQuestion {
  question_style: "drag_and_drop";
  possible_answers: string[];
  correct_answer: string[]; // Correct answers for drag-and-drop can be an array of strings
  no_of_ans_box: number;
}

// Matching-specific interface
interface MatchingQuestion extends BaseQuestion {
  question_style: "matching";
  possible_answers: string[];
  matching_pairs: { term: string; definition: string }[]; // Array of term-definition pairs
  correct_answer: string;
}

// Fill-in-the-Blanks-specific interface
interface FillInTheBlanksQuestion extends BaseQuestion {
  question_style: "fill_in_the_blanks";
  correct_answer: string; // The correct answer for fill-in-the-blank
  possible_answers?: string[]; // Optional array of possible options if multiple are accepted
}

// Union type for all question styles
export type Question =
  | MultipleChoiceQuestion
  | DragAndDropQuestion
  | MatchingQuestion
  | FillInTheBlanksQuestion;

export interface QuizQuestions {
  level1: Question[];
  level2: Question[];
  level3: Question[];
}

export const numeracy_questions: QuizQuestions = {
  level1: [
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
    },
    {
      question_number: "num_l1_2",
      question_text:
        "If you have 5 apples and you pick 3 more from a tree, how many apples do you have in total?",
      question_style: "multiple_choice_question",
      correct_answer: "8",
      possible_answers: ["8", "7", "6", "9"],
    },
    {
      question_number: "num_l1_3",
      question_text:
        "You have a bag with 3 red balls, 2 blue balls, and 1 yellow ball. If you pick one ball at random, what color are you most likely to pick?",
      question_style: "multiple_choice_question",
      correct_answer: "Red🔴",
      possible_answers: ["Red🔴", "Blue🔵", "Yellow🟡", "Green🟢"],
    },
    {
      question_number: "num_l1_4",
      question_text:
        "You have 3 big red apples, 2 small green apples, and 1 big green apple. Which group has the most apples?",
      question_style: "multiple_choice_question",
      correct_answer: "Big apples",
      possible_answers: ["Big apples", "Small apples", "Green apples", "Red apples"],
    },
    // {
    //   question_number: "num_l1_5",
    //   question_text:
    //     "3  7 4 1 5 \n8 10 9 2 6 \nPut these numbers in order (from biggest to smallest) in words",
    //   question_style: "open_ended_question",
    //   correct_answer: NaN,
    // },
    {
      question_number: "num_l1_6",
      question_text: "Put these numbers in ascending order (from smallest to biggest)",
      possible_answers: ["3", "7", "4", "1", "5", "8", "10", "9", "2", "6"],
      question_style: "drag_and_drop",
      correct_answer: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      no_of_ans_box: 10,
    },
    {
      question_number: "num_l1_7",
      question_text:
        "You have 20 balloons at a party. 8 of them pop. How many balloons are still floating?",
      question_style: "multiple_choice_question",
      correct_answer: "12",
      possible_answers: ["28", "20", "8", "12"],
    },
    {
      question_number: "num_l1_8",
      question_text: "You had 12 marbles, but you lost 7. How many marbles do you have now?",
      question_style: "multiple_choice_question",
      correct_answer: "5",
      possible_answers: ["4", "5", "6", "7"],
    },
    {
      question_number: "num_l1_9",
      question_text: "Which of the following holds the most liquid?",
      question_style: "multiple_choice_question",
      correct_answer: "A bucket🪣",
      possible_answers: ["A cup☕️", "A bowl🥣", "A teaspoon🥄", "A bucket🪣"],
    },
    {
      question_number: "num_l1_10",
      question_text: "Which is likely to be longer: a pencil or a ruler?",
      question_style: "multiple_choice_question",
      correct_answer: "Ruler📏",
      possible_answers: ["Pencil✏️", "Ruler📏", "They are the same length", "Can\u2019t tell"],
    },
    {
      question_number: "num_l1_11",
      question_text: "Which object is likely to weigh more?",
      question_style: "multiple_choice_question",
      correct_answer: "A brick",
      possible_answers: ["A feather", "A brick", "A balloon", "A leaf"],
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
    },
    {
      question_number: "num_l1_13",
      question_text: "What shape is a football?",
      question_style: "multiple_choice_question",
      correct_answer: "Circle",
      possible_answers: ["Square", "Triangle", "Circle", "Cube"],
    },
    {
      question_number: "num_l1_14",
      question_text:
        "You\u2019re organising a birthday party. If you invite five friends and three more decide to come, how many friends will be at the party?",
      question_style: "multiple_choice_question",
      correct_answer: "8",
      possible_answers: ["6", "7", "8", "9"],
    },
    {
      question_number: "num_l1_15",
      question_text: "How many weeks are there in a year?",
      question_style: "multiple_choice_question",
      correct_answer: "52",
      possible_answers: ["52", "50", "12", "4"],
    },
    {
      question_number: "num_l1_16",
      question_text: "How many months are there in a year?",
      question_style: "multiple_choice_question",
      correct_answer: "12",
      possible_answers: ["12", "10", "52", "7"],
    },
    // {
    //   question_number: "num_l1_17",
    //   question_text: "Complete the table with the days, months, and seasons IN ORDER",
    //   question_style: "open_ended_question",
    //   correct_answer: NaN,
    // },
    {
      question_number: "num_l1_18",
      question_text:
        "If you have a \u00a310 note and you buy a toy for \u00a36, how much money will you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a34.00",
      possible_answers: ["\u00a32.00", "\u00a33.00", "\u00a34.00", "\u00a35.00"],
    },
    {
      question_number: "num_l1_19",
      question_text:
        "Your favourite TV show starts at 3 o\u2019clock in the afternoon. What time will it be when the show ends if it lasts for 2 hours?",
      question_style: "multiple_choice_question",
      correct_answer: "5 o\u2019clock",
      possible_answers: ["4 o\u2019clock", "5 o\u2019clock", "6 o\u2019clock", "7 o\u2019clock"],
    },
    {
      question_number: "num_l1_20",
      question_text:
        "You have 3 coins: a 5p, a 2p, and a 1p coin. How much money do you have in total?",
      question_style: "multiple_choice_question",
      correct_answer: "8p",
      possible_answers: ["7p", "8p", "9p", "10p"],
    },
  ],
  level2: [
    {
      question_number: "num_l2_1",
      question_text: "What is the sum of 18 + 6?",
      question_style: "multiple_choice_question",
      correct_answer: "24",
      possible_answers: ["22", "23", "24", "25"],
    },
    {
      question_number: "num_l2_2",
      question_text: "Which of the following represents half of a pizza?",
      question_style: "multiple_choice_question",
      correct_answer: "1/2",
      possible_answers: ["1/3", "1/4", "1/2", "2/3"],
    },
    {
      question_number: "num_l2_3",
      question_text:
        "If you survey your group of friends and 4 of them like football, three like basketball, and five like tennis, which sport is the most popular?",
      question_style: "multiple_choice_question",
      correct_answer: "Tennis",
      possible_answers: ["Football", "Basketball", "Tennis", "All are equally popular"],
    },
    {
      question_number: "num_l2_4",
      question_text:
        "You have \u00a325. You buy a toy for \u00a315. How much money do you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a310.00",
      possible_answers: ["\u00a340.00", "\u00a315.00", "\u00a325.00", "\u00a310.00"],
    },
    {
      question_number: "num_l2_5",
      question_text:
        "If the temperature is 25\u00b0C and it drops by 10\u00b0C, what is the new temperature?",
      question_style: "multiple_choice_question",
      correct_answer: "15\u00b0C",
      possible_answers: ["10\u00b0C", "15\u00b0C", "20\u00b0C", "35\u00b0C"],
    },
    {
      question_number: "num_l2_6",
      question_text: "What is 4 x 3 ?",
      question_style: "multiple_choice_question",
      correct_answer: "12",
      possible_answers: ["10", "12", "14", "16"],
    },
    {
      question_number: "num_l2_7",
      question_text: "Which of the following objects is likely to be about 1 metre long?",
      question_style: "multiple_choice_question",
      correct_answer: "A desk",
      possible_answers: ["A spoon", "A desk", "A ruler", "A pencil"],
    },
    {
      question_number: "num_l2_8",
      question_text:
        "You have a \u00a310 note. You buy an item for \u00a34.25. How much change should you get back?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a35.75",
      possible_answers: ["\u00a34.25", "\u00a35.25", "\u00a35.50", "\u00a35.75"],
    },
    {
      question_number: "num_l2_9",
      question_text: "What is the name of a 3D shape with 6 square faces?",
      question_style: "multiple_choice_question",
      correct_answer: "Cube",
      possible_answers: ["Sphere", "Cone", "Cube", "Cylinder"],
    },
    {
      question_number: "num_l2_10",
      question_text:
        "If you divide 12 apples equally between 3 friends, how many apples does each friend get?",
      question_style: "multiple_choice_question",
      correct_answer: "4",
      possible_answers: ["3", "4", "5", "6"],
    },
    {
      question_number: "num_l2_11",
      question_text: "Which is heavier: a kilogram of feathers or a kilogram of rocks?",
      question_style: "multiple_choice_question",
      correct_answer: "They weigh the same",
      possible_answers: ["The feathers", "The rocks", "They weigh the same", "Can\u2019t tell"],
    },
    {
      question_number: "num_l2_12",
      question_text:
        "If the clock shows 11:30 a.m., and your lunch break is 1 hour later, what time will it be when your break starts?",
      question_style: "multiple_choice_question",
      correct_answer: "12.30 pm",
      possible_answers: ["12.30 pm", "12.30 am", "12.00 am", "11.30 pm"],
    },
    {
      question_number: "num_l2_13",
      question_text: "What is 0.5 as a fraction?",
      question_style: "multiple_choice_question",
      correct_answer: "1/2",
      possible_answers: ["1/3", "1/2", "1/4", "2/3"],
    },
    {
      question_number: "num_l2_14",
      question_text: "How many 50p coins do you need to make \u00a32?",
      question_style: "multiple_choice_question",
      correct_answer: "4",
      possible_answers: ["2", "3", "4", "5"],
    },
    {
      question_number: "num_l2_15",
      question_text:
        "A bar graph shows how many books each student read in a month. Sarah read 5 books, John read 3 books, and Tom read 7 books. Who read the most books?",
      question_style: "multiple_choice_question",
      correct_answer: "Tom",
      possible_answers: ["Sarah", "John", "Tom", "Can\u2019t tell"],
    },
  ],
  level3: [
    {
      question_number: "num_l3_1",
      question_text: "What is half of 16?",
      question_style: "multiple_choice_question",
      correct_answer: "8",
      possible_answers: ["6", "7", "8", "9"],
    },
    {
      question_number: "num_l3_2",
      question_text:
        "A store had 45 bicycles. They sold 18 in one day. How many bicycles are left in the store?",
      question_style: "multiple_choice_question",
      correct_answer: "27",
      possible_answers: ["24", "29", "28", "27"],
    },
    {
      question_number: "num_l3_3",
      question_text:
        "If 12 people like football, 8 people like basketball, and 5 people like tennis, which sport is the least popular?",
      question_style: "multiple_choice_question",
      correct_answer: "Tennis",
      possible_answers: ["Football", "Basketball", "Tennis", "All are equally popular"],
    },
    {
      question_number: "num_l3_4",
      question_text: "How many centimetres are in a metre?",
      question_style: "multiple_choice_question",
      correct_answer: "100",
      possible_answers: ["10", "50", "100", "1000"],
    },
    {
      question_number: "num_l3_5",
      question_text:
        "If a bag of flour weighs 2 kilograms and a bag of sugar weighs 3 kilograms, what is the total weight of both bags?",
      question_style: "multiple_choice_question",
      correct_answer: "5 kg",
      possible_answers: ["4 kg", "5 kg", "6 kg", "7 kg"],
    },
    {
      question_number: "num_l3_6",
      question_text:
        "You have \u00a315. You spend \u00a36.50 on a book and \u00a33.25 on lunch. How much money do you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "\u00a35.25",
      possible_answers: ["\u00a35.25", "\u00a35.50", "\u00a35.75", "\u00a36.00"],
    },
    {
      question_number: "num_l3_7",
      question_text: "What is the result of 5 \u00d7 6?",
      question_style: "multiple_choice_question",
      correct_answer: "30",
      possible_answers: ["25", "30", "35", "40"],
    },
    {
      question_number: "num_l3_8",
      question_text:
        "If a bus leaves at 11:30 a.m. and the journey takes 2 hours, what time does the bus arrive?",
      question_style: "multiple_choice_question",
      correct_answer: "1.30 pm",
      possible_answers: ["12.30 pm", "1.00 pm", "1.30 pm", "2.00 pm"],
    },
    {
      question_number: "num_l3_9",
      question_text: "Which shape has 4 equal sides and 4 right angles?",
      question_style: "multiple_choice_question",
      correct_answer: "Square",
      possible_answers: ["Triangle", "Rectangel", "Rhombus", "Square"],
    },
    {
      question_number: "num_l3_10",
      question_text: "What is 0.75 as a fraction?",
      question_style: "multiple_choice_question",
      correct_answer: "3/4",
      possible_answers: ["1/2", "3/4", "1/4", "2/3"],
    },
    {
      question_number: "num_l3_11",
      question_text: "What is the sum of 45 + 32?",
      question_style: "multiple_choice_question",
      correct_answer: "77",
      possible_answers: ["76", "77", "78", "79"],
    },
    {
      question_number: "num_l3_12",
      question_text:
        "A bar graph shows how many hours students spent studying in a week. Sam studied for 12 hours, Emily for 8 hours, and Lucas for 15 hours. How many more hours did Lucas study compared to Emily?",
      question_style: "multiple_choice_question",
      correct_answer: "7",
      possible_answers: ["7", "23", "3", "4"],
    },
  ],
};

export const literacy_questions: QuizQuestions = {
  level1: [
    {
      question_number: "lit_l1_1",
      question_text: "If your friend says, \u201cPlease close the door,\u201d what should you do?",
      question_style: "multiple_choice_question",
      correct_answer: "Close the door",
      possible_answers: ["Open the door", "Close the door", "Leave the room", "Ignore the request"],
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
        "Wak away",
        "Interrupt them",
      ],
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
    },
    {
      question_number: "lit_l1_4",
      question_text:
        "If you are given the instruction, \u201cTurn left at the next corner,\u201d what should you do?",
      question_style: "multiple_choice_question",
      correct_answer: "Turn left",
      possible_answers: ["Turn right", "Turn left", "Keep walking straight", "Stop walking"],
    },
    {
      question_number: "lit_l1_5",
      question_text: "Which day of the week comes after Thursday?",
      question_style: "multiple_choice_question",
      correct_answer: "Friday",
      possible_answers: ["Friday", "Sunday", "Monday", "Saturday"],
    },
    {
      question_number: "lit_l1_6",
      question_text: "Place these months of the year into order.",
      question_style: "drag_and_drop",
      correct_answer: ["January", "March", "July", "December"],
      possible_answers: ["July", "March", "December", "January"],
      no_of_ans_box: 4,
    },
    {
      question_number: "lit_l1_7",
      question_text: "Identify the correct spelling of the season.",
      question_style: "multiple_choice_question",
      correct_answer: "Summer",
      possible_answers: ["Summer", "Sumer", "Sommer", "Summor"],
    },
    {
      question_number: "lit_l1_8",
      question_text:
        "A food menu has a list of starters, mains, desserts and drinks. Where would I look to see if they served ice cream?",
      question_style: "multiple_choice_question",
      correct_answer: "Desserts",
      possible_answers: ["Desserts", "Drinks", "Mains", "Starters"],
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
    },
    {
      question_number: "lit_l1_10",
      question_text:
        "Here is an example of a bus timetable. What time does Bus 25 arrive at Maple Drive?",
      question_style: "multiple_choice_question",
      correct_answer: "11:00 AM",
      possible_answers: ["11:00 AM", "8:00 AM", "10.30AM", "12 noon"],
      image: "lit_l1_10.png",
    },
    // {
    //   question_number: "lit_l1_Read and Spell Words for Everyday Life",
    //   question_text: "What is the next letter in this upper case alphabet?",
    //   question_style: "One empty line",
    //   correct_answer: NaN,
    //   possible_answers: ["B", "A _ C D E F G"],
    // },
    {
      question_number: "lit_l1_Read and Spell Words for Everyday Life",
      question_text: "Identity the sentence with the correct spelling.",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: [
        "He is thirteen today.",
        "He is thirten today.",
        "He is thireen today.",
        "He is thirteene today.",
      ],
    },
    {
      question_number: "lit_l1_Read and Spell Words for Everyday Life",
      question_text: "Which of these sentences contains both a noun and a verb.",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: [
        "I went for a run in the park.",
        "I went for a run.",
        "I like running.",
        "Exercise is good for you.",
      ],
    },
    {
      question_number: "lit_l1_Read and Spell Words for Everyday Life",
      question_text: "Fill in the missing letters to spell this word correctly. Wa _ _ h ",
      question_style: "drag_and_drop",
      correct_answer: ["tc"],
      possible_answers: ["tc", "ts", "ch", "sh"],
      no_of_ans_box: 1,
    },
    {
      question_number: "lit_l1_Read and Understand Symbols",
      question_text: "If you see a red circle with a line through it on a sign, what does it mean?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: [
        "You can do whatever you want",
        "No entry or something is not allowed",
        "It means \u201center here\u201d",
        "It\u2019s just a decoration",
      ],
    },
    // {
    //   question_number: "lit_l1_Write Using Correct Punctuation and Grammar",
    //   question_text: "Match the punctuation marks to their correct name.",
    //   question_style: "Matching",
    //   correct_answer: NaN,
    //   possible_answers: ["Full stop (.)", "Exclamation mark (!)", "Question mark (?)", "Comma (,)"],
    // },
    {
      question_number: "lit_l1_Write Using Correct Punctuation and Grammar",
      question_text: "Select the correct opening for a letter written to John.",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: ["Dear John", "Deer John", "Dear Jon", "dear John"],
    },
    // {
    //   question_number: "lit_l1_Write Using Correct Punctuation and Grammar",
    //   question_text: "Match these words to their correct definitions.",
    //   question_style: "matching",
    //   correct_answer: {
    //     "naming word. A person, place or thing.": "Noun",
    //     "describing word.": "Adjective",
    //     "an action or doing word.": "Verb",
    //     "a word that can replace a noun in a sentence (I)": "Pronoun",
    //   },
    //   possible_answers: {
    //     terms: ["Noun", "Adjective", "Verb", "Pronoun"],
    //     definitions: [
    //       "naming word. A person, place or thing.",
    //       "describing word.",
    //       "an action or doing word.",
    //       "a word that can replace a noun in a sentence (I)",
    //     ],
    //   },
    // },
    {
      question_number: "lit_l1_Write Using Correct Punctuation and Grammar",
      question_text: "What is the correct spelling of this capital city?",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: ["Belfast", "belfast", "bellfast", "Bellfast"],
    },
    {
      question_number: "lit_l1_Write Words to Communicate Information",
      question_text:
        "You need to write a shopping list. Which of these is correct for writing on the list?",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: [
        "Apples, bread, milk",
        "Play, jump, run",
        "Blue, yellow, red",
        "Hello, goodbye, thanks",
      ],
    },
  ],
  level2: [
    {
      question_number: "lit_l1_Respond to a request",
      question_text:
        "If your manager asks, \u201cCan you please send me the report by the end of the day?\u201d, what is an appropriate response?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: [
        "Ignore them",
        "Respond politely",
        "Say, \u201cDo it yourself!\u201d",
        "Walk away and do not respond",
      ],
    },
    {
      question_number: "lit_l1_Take Part in a Group Discussion",
      question_text:
        "During a team meeting at work, what is the best way to participate in a group discussion?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: [
        "Interrupt others when you have a point to make",
        "Listen to others, take turns speaking, and respond respectfully",
        "Speak over others to make sure your opinion is heard",
        "Stay silent throughout the meeting and not contribute",
      ],
    },
    {
      question_number: "lit_l1_Speak to Communicate Information",
      question_text:
        "You are asked to give a brief update on a project during a meeting. What is the best way to communicate this information?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: [
        "Speak loudly without considering others",
        "Use clear and concise language to explain the project\u2019s status",
        "Give irrelevant details and go off-topic",
        "Speak very quietly so others cannot hear",
      ],
    },
    {
      question_number: "lit_l1_Follow Instructions",
      question_text:
        "Your supervisor gives you the following instructions: \u201cFirst, organise the files alphabetically, and then place them in the cabinet.\u201d What should you do first?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: [
        "Place the files in the cabinet",
        "Ask for help",
        "Organise the files alphabetically",
        "Ignore the instructions",
      ],
    },
    {
      question_number: "lit_l1_Read and Understand Signs and Symbols",
      question_text:
        "You see a sign with a red circle and a diagonal line over a cigarette. What does this sign mean?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: [
        "Smoking is allowed",
        "Smoking is prohibted",
        "Smoking is optional",
        "Smoking is encouraged",
      ],
    },
    // {
    //   question_number: "lit_l1_Read Texts for Meaning",
    //   question_text:
    //     "The following four sentences contain two facts and two opinions. Label each one correctly.",
    //   question_style: "matching",
    //   correct_answer: "NaN",
    //   possible_answers: [
    //     "The Walt Disney Company was founded in 1923 by Walt Disney and Roy O. Disney. (F)",
    //     "The Disney parks are the most magical theme parks in the world. (O)",
    //     "Disney's first full-length animated feature film was Snow White and the Seven Dwarfs, released in 1937. (F)",
    //     "Disney creates the best animated movies for children. (O)",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Read Texts for Meaning",
    //   question_text:
    //     "Read this short comprehension about the Eiffel Tower and answer the following question: What was the name of the man who designed the Eiffel Tower?",
    //   question_style: "Single line.",
    //   correct_answer: "A",
    //   possible_answers: ["Gustave Eiffel", "World\u2019s Fair", "Eiffel Tower"],
    // },
    // {
    //   question_number: "lit_l1_Read Texts for Meaning",
    //   question_text: "Match the words to the correct definitions.",
    //   question_style: "Matching",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Worried - feeling anxious or uneasy about something that might happen.",
    //     "Excited - feeling happy or enthusiastic about something that is about to happen.",
    //     "Frustrated - feeling upset or annoyed because you are unable to achieve something.",
    //     "Stressed - feeling overwhelmed because of pressure or high demands.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Read Texts for Meaning",
    //   question_text: "Place these words in alphabetical order.",
    //   question_style: "drag_and_drop",
    //   correct_answer: NaN,
    //   possible_answers: ["Narrow", "Necessary", "Needed", "Number"],
    // },
    {
      question_number: "lit_l1_Read Texts for Meaning",
      question_text:
        "The old coin is very valuable to collectors. What does the word \u201cvaluable\u201d mean?",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: [
        "Something has significant worth.",
        "Something that is worthless.",
        "Something that is free.",
        "Something that is not useful or practical.",
      ],
    },
    {
      question_number: "lit_l1_Read and Spell Words for Everyday Life",
      question_text: "Which word is spelled correctly for a formal work email?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["Definately", "Definitely", "Defanatly", "Definetely"],
    },
    {
      question_number: "lit_l1_Write Using Correct Punctuation and Grammar",
      question_text:
        "Which of the following sentences uses correct punctuation and grammar for a formal email?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: [
        "i will send the report tomorrow morning.",
        "I will send the report, tomorrow morning?",
        "I will send the report tomorrow morning.",
        "I will send the report; tomorrow, morning.",
      ],
    },
    // {
    //   question_number: "lit_l1_Write Using Correct Punctuation",
    //   question_text: "Which of these is not a feeling or an opinion?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "He was late to the party.",
    //     "I feel they were late to the party.",
    //     "I think they were late to the party.",
    //     "You think they were late to the party.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write Using Correct Punctuation",
    //   question_text: "Which of these sentences are punctuated correctly.",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Unfortunately, I didn\u2019t make it to my class because my bus was late.",
    //     "Unfortunately I didn\u2019t make it, to my class, because my bus was late.",
    //     "Unfortunately I, didn\u2019t make it to my class because my bus was late.",
    //     "Unfortunately, I didn\u2019t make it, to my class, because my bus was late.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write Using Correct Punctuation",
    //   question_text:
    //     "The word \u201cweren\u2019t\u201d is a contraction of which of these two words?",
    //   question_style: "multiple_choice_question.",
    //   correct_answer: NaN,
    //   possible_answers: ["Were not", "Is not", "Was not", "Do not"],
    // },
    // {
    //   question_number: "lit_l1_Write Using Correct Punctuation",
    //   question_text:
    //     "Make all of the following words plural by matching the word to the correct plural form.",
    //   question_style: "Matching",
    //   correct_answer: NaN,
    //   possible_answers: ["Orange (s)", "Brush (es)", "Baby (ies)", "Leaf (ves)"],
    // },
    // {
    //   question_number: "lit_l1_Write Sentences Using Correct Punctuation and Grammar",
    //   question_text: "Which of the following sentences is written correctly?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "I will meet you tomorrow, we need to discuss the project.",
    //     "I will meet you tomorrow. We need to discuss the project.",
    //     "I will meet you tomorrow we need to discuss, the project.",
    //     "I will meet you, tomorrow, we need to discuss the project.",
    //   ],
    // },
  ],
  level3: [
    // {
    //   question_number: "lit_l1_Respond to a Range of Requests",
    //   question_text:
    //     "Your manager sends you an email asking for a report by Friday and a follow-up call with the client by Monday. What is the best way to respond?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Ignore the email and complete the tasks without responding",
    //     "Reply to confirm you will complete both tasks and mention any potential issues",
    //     "Wait until Monday to respond",
    //     "Respond only about the report, ignoring the call request",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Take Part in a Discussion with Another Person",
    //   question_text:
    //     "During a work meeting, your colleague shares an idea that you disagree with. How should you contribute to the discussion?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Interrupt and criticise their idea",
    //     "Politely explain your point of view and provide reasons for your disagreement",
    //     "Remain silent and not contribute",
    //     "Dismiss their idea without giving feedback",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Read Texts for Meaning",
    //   question_text:
    //     "You are reading an article about climate change. Which of the following actions would best help you understand the writer\u2019s argument?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Skimming the article quickly",
    //     "Ignoring unfamiliar words",
    //     "Identifying the main points and supporting evidence in the article",
    //     "Reading only the introduction and conclusion",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Read and Understand Signs and Symbols",
    //   question_text:
    //     "You see a sign in the workplace with an image of a fire extinguisher and the words \u201cFire Equipment.\u201d What does this sign indicate?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "The area is a fire hazard",
    //     "The location of fire safety equipment",
    //     "A fire alarm",
    //     "An emergency exit",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write Texts Using Appropriate Punctuation",
    //   question_text: "Which sentence uses punctuation correctly for an email response?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Can you meet tomorrow at 10am, we need to discuss the project.",
    //     "Can you meet tomorrow at 10 a.m.? We need to discuss the project.",
    //     "Can you meet, tomorrow at 10 am. we need to discuss the project.",
    //     "Can you meet tomorrow at 10 am we need to discuss the project?",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Spell Words Used in Everyday Life",
    //   question_text: "Which of the following is the correct spelling for a formal letter?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: ["Recieve", "Recive", "Receive", "Receve"],
    // },
    // {
    //   question_number: "lit_l1_Use Writing Skills \u2013 Format and Structure",
    //   question_text: "Select the sentence with more than one clause.",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "The sun set behind the mountains, and the sky turned a deep shade of orange.",
    //     "The cat slept on the windowsill.",
    //     "The rain poured heavily all afternoon.",
    //     "She quickly finished her homework.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Use Writing Skills \u2013 Format and Structure",
    //   question_text:
    //     "You are writing a report for your manager. Which of the following best demonstrates the correct structure for a formal report?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Start with a greeting, followed by casual explanations, and end with \u201cThanks!\u201d",
    //     "Begin with a title, include an introduction that explains the purpose, followed by clear sections with headings, and end with a conclusion and recommendations.",
    //     "Write in short bullet points with no introduction or conclusion.",
    //     "Start with a question, followed by random facts, and finish with \u201cThe end.\u201d",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write for Purpose and Audience",
    //   question_text:
    //     "Select the sentence that uses the correct subject-verb agreement and consistent use of tenses, definite and indefinite articles:",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "The ducks swam eagerly towards the edge as the little girl tossed some bread into the water.",
    //     "The ducks swims eagerly towards the edge as the little girl tossed some bread into the water.",
    //     "The ducks swam eagerly towards the edge as the little girl tosses some bread into the water.",
    //     "The duck swim eagerly towards the edge while the little girl tossing some bread into the water.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write for Purpose and Audience",
    //   question_text:
    //     "You need to write a formal letter to your local council requesting road repairs in your area. Which of the following is the most appropriate opening for your letter?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "Hi there, I\u2019m writing about some road issues in my area.",
    //     "To Whom It May Concern, I am writing to formally request road repairs on Elm Street due to safety concerns.",
    //     "Hello, can you please fix the roads?",
    //     "Hey, we\u2019ve got some road problems that need fixing.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write Sentences Using Correct Grammar",
    //   question_text: "Which sentence uses correct grammar?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "She don\u2019t want to go to the meeting tomorrow.",
    //     "She doesn\u2019t want to go to the meeting tomorrow.",
    //     "She didn\u2019t went to the meeting tomorrow.",
    //     "She isn\u2019t wanting to go to the meeting tomorrow.",
    //   ],
    // },
    // {
    //   question_number: "lit_l1_Write Sentences Using Correct Grammar",
    //   question_text:
    //     "Which of the following sentences uses correct grammar and maintains verb tense consistency?",
    //   question_style: "multiple_choice_question",
    //   correct_answer: NaN,
    //   possible_answers: [
    //     "After I finish the report, I sent it to my supervisor.",
    //     "After I finished the report, I will send it to my supervisor.",
    //     "After I finish the report, I will send it to my supervisor.",
    //     "After I finish the report, I was sending it to my supervisor.",
    //   ],
    // },
  ],
};
