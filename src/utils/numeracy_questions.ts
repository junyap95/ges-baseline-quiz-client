export interface Question {
  question_number: string;
  question_text: string;
  question_style: string;
  correct_answer: string | number;
  possible_answers?: string[];
}

export interface NumeracyQuestions {
  level1: Question[];
  level2: Question[];
  level3: Question[];
}

export const numeracy_questions: NumeracyQuestions = {
  level1: [
    {
      question_number: "num_l1_1",
      question_text: "Which of the following is a good way to improve your math skills?",
      question_style: "multiple_choice_question",
      correct_answer: "Practicing every day",
      possible_answers: [
        "Practicing every day",
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
      correct_answer: "Red",
      possible_answers: ["Red", "Blue", "Yellow", "Green"],
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
    // {
    //   question_number: "num_l1_6",
    //   question_text:
    //     "3  7 4 1 5 \n8 10 9 2 6 \nPut these numbers in order (from smallest to biggest)",
    //   question_style: "open_ended_question",
    //   correct_answer: NaN,
    // },
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
      correct_answer: "A jug",
      possible_answers: ["A cup", "A jug", "A teaspoon", "A bottle cap"],
    },
    {
      question_number: "num_l1_10",
      question_text: "Which is likely to be longer: a pencil or a ruler?",
      question_style: "multiple_choice_question",
      correct_answer: "Ruler",
      possible_answers: ["Pencil", "Ruler", "They are the same length", "Can\u2019t tell"],
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
      correct_answer: "C",
      possible_answers: ["22", "23", "24", "25"],
    },
    {
      question_number: "num_l2_2",
      question_text: "Which of the following represents half of a pizza?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["1/3", "1/4", "1/2", "2/3"],
    },
    {
      question_number: "num_l2_3",
      question_text:
        "If you survey your group of friends and 4 of them like football, three like basketball, and five like tennis, which sport is the most popular?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["Football", "Basketball", "Tennis", "All are equally popular"],
    },
    {
      question_number: "num_l2_4",
      question_text:
        "You have \u00a325. You buy a toy for \u00a315. How much money do you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "D",
      possible_answers: ["\u00a340.00", "\u00a315.00", "\u00a325.00", "\u00a310.00"],
    },
    {
      question_number: "num_l2_5",
      question_text:
        "If the temperature is 25\u00b0C and it drops by 10\u00b0C, what is the new temperature?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["10\u00b0C", "15\u00b0C", "20\u00b0C", "35\u00b0C"],
    },
    {
      question_number: "num_l2_6",
      question_text: "What is 4 x 3 ?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["10", "12", "14", "16"],
    },
    {
      question_number: "num_l2_7",
      question_text: "Which of the following objects is likely to be about 1 metre long?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["A spoon", "A desk", "A ruler", "A pencil"],
    },
    {
      question_number: "num_l2_8",
      question_text:
        "You have a \u00a310 note. You buy an item for \u00a34.25. How much change should you get back?",
      question_style: "multiple_choice_question",
      correct_answer: "D",
      possible_answers: ["\u00a34.25", "\u00a35.25", "\u00a35.50", "\u00a35.75"],
    },
    {
      question_number: "num_l2_9",
      question_text: "What is the name of a 3D shape with 6 square faces?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["Sphere", "Cone", "Cube", "Cylinder"],
    },
    {
      question_number: "num_l2_10",
      question_text:
        "If you divide 12 apples equally between 3 friends, how many apples does each friend get?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["3", "4", "5", "6"],
    },
    {
      question_number: "num_l2_11",
      question_text: "Which is heavier: a kilogram of feathers or a kilogram of rocks?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["The feathers", "The rocks", "They weigh the same", "Can\u2019t tell"],
    },
    {
      question_number: "num_l2_12",
      question_text:
        "If the clock shows 11:30 a.m., and your lunch break is 1 hour later, what time will it be when your break starts?",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: ["12.30 pm", "12.30 am", "12.00 am", "12.30 pm"],
    },
    {
      question_number: "num_l2_13",
      question_text: "What is 0.5 as a fraction?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["1/3", "1/2", "1/4", "2/3"],
    },
    {
      question_number: "num_l2_14",
      question_text: "How many 50p coins do you need to make \u00a32?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["2", "3", "4", "5"],
    },
    {
      question_number: "num_l2_15",
      question_text:
        "A bar graph shows how many books each student read in a month. Sarah read 5 books, John read 3 books, and Tom read 7 books. Who read the most books?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["Sarah", "John", "Tom", "Can\u2019t tell"],
    },
  ],
  level3: [
    {
      question_number: "num_l3_1",
      question_text: "What is half of 16?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["6", "7", "8", "9"],
    },
    {
      question_number: "num_l3_2",
      question_text:
        "A store had 45 bicycles. They sold 18 in one day. How many bicycles are left in the store?",
      question_style: "multiple_choice_question",
      correct_answer: "D",
      possible_answers: ["24", "29", "28", "27"],
    },
    {
      question_number: "num_l3_3",
      question_text:
        "If 12 people like football, 8 people like basketball, and 5 people like tennis, which sport is the least popular?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["Football", "Basketball", "Tennis", "All are equally popular"],
    },
    {
      question_number: "num_l3_4",
      question_text: "How many centimetres are in a metre?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["10", "50", "100", "1000"],
    },
    {
      question_number: "num_l3_5",
      question_text:
        "If a bag of flour weighs 2 kilograms and a bag of sugar weighs 3 kilograms, what is the total weight of both bags?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["4 kg", "5 kg", "6 kg", "7 kg"],
    },
    {
      question_number: "num_l3_6",
      question_text:
        "You have \u00a315. You spend \u00a36.50 on a book and \u00a33.25 on lunch. How much money do you have left?",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: ["\u00a35.25", "\u00a35.50", "\u00a35.75", "\u00a36.00"],
    },
    {
      question_number: "num_l3_7",
      question_text: "What is the result of 5 \u00d7 6?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["25", "30", "35", "40"],
    },
    {
      question_number: "num_l3_8",
      question_text:
        "If a bus leaves at 11:30 a.m. and the journey takes 2 hours, what time does the bus arrive?",
      question_style: "multiple_choice_question",
      correct_answer: "C",
      possible_answers: ["12.30 pm", "1.00 pm", "1.30 pm", "2.00 pm"],
    },
    {
      question_number: "num_l3_9",
      question_text: "Which shape has 4 equal sides and 4 right angles?",
      question_style: "multiple_choice_question",
      correct_answer: "D",
      possible_answers: ["Triangle", "Rectangel", "Rhombus", "Square"],
    },
    {
      question_number: "num_l3_10",
      question_text: "What is 0.75 as a fraction?",
      question_style: "multiple_choice_question",
      correct_answer: "B",
      possible_answers: ["1/2", "3/4", "1/4", "2/3"],
    },
    {
      question_number: "num_l3_11",
      question_text: "What is the sum of 45 + 32?",
      question_style: "multiple_choice_question",
      correct_answer: "D",
      possible_answers: ["76", "77", "78", "79"],
    },
    {
      question_number: "num_l3_12",
      question_text:
        "A bar graph shows how many hours students spent studying in a week. Sam studied for 12 hours, Emily for 8 hours, and Lucas for 15 hours. How many more hours did Lucas study compared to Emily?",
      question_style: "multiple_choice_question",
      correct_answer: "A",
      possible_answers: ["Apples", "Bananas", "Grapes", "All are equally popular"],
    },
  ],
};
