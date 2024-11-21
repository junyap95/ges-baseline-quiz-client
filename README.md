[![Netlify Status](https://api.netlify.com/api/v1/badges/6a71d40b-421c-4ff4-80ec-710b55e6e23d/deploy-status?branch=main)](https://app.netlify.com/sites/studyseed-ges/deploys)

# GES Baseline Quiz Client

## Overview

The GES Baseline Quiz Client is designed to facilitate quizzes. It provides a user-friendly interface for quiz selection, execution, and result handling.

### Project Brief

This project was developed for Studyseed in collaboration with the Lisburn and Castlereagh City Council.
[View the LinkedIn post](https://www.linkedin.com/embed/feed/update/urn:li:share:7247534852734906368)

<div style="display: flex; align-items: center">
    <img src="https://ik.imagekit.io/jbyap95/gamified%20learning%20programme.png?updatedAt=1730298460178" width="300"/>
    <img src="https://ik.imagekit.io/jbyap95/LCCC_Logo_no_bg.png?updatedAt=1732185914637" width="200"/>
</div>

## Baseline Quiz User Interface

<img src="https://ik.imagekit.io/jbyap95/ezgif-6-ac1cd5e3de.gif" width="800"/>

## Different Question Styles

<img src="https://ik.imagekit.io/jbyap95/fill_question.png" width="350"/>
<img src="https://ik.imagekit.io/jbyap95/matching_question.png" width="350"/>

- **Multiple-Choice**: Allows users to select one or more options from a list of possible answers. This style is useful for questions with distinct, predefined answers.
- **Fill In The Blank**: Users are required to type in the missing word or phrase in a sentence or paragraph. This style tests the user's recall and understanding of specific information.
- **Drag-and-drop**: Users can drag items from one area and drop them into another. This interactive style is great for matching or ordering tasks, enhancing engagement.
- **Matching**: Users match items from two columns. This style is effective for testing the understanding of relationships between concepts or terms.

## Technical Overview

- **Routing**: Utilizes `react-router-dom` for client-side routing, enabling smooth navigation between different components such as the introduction, quiz selection, and quiz running screens.
- **State Management**: Employs `@reduxjs/toolkit` for efficient state management.
- **Testing**: Includes comprehensive testing using `@testing-library/react` and `jest`.
- **Styling**: Uses `styled-components` for component-level styling.
- **Transitions**: Implements animations and transitions with `react-transition-group`.
- **Data Handling**: Supports data submission to Google Sheets.

## Project Structure

- **`src/App.tsx`**: The main application component that sets up routing for different parts of the application.
- **`src/index.tsx`**: Entry point of the application, rendering the `App` component within a `BrowserRouter`.
- **`src/Components`**: Contains React components used throughout the application, such as `IntroductionContainer`, `QuizSelection`, and `QuizRunnerContainer`.
- **`src/utils`**: Utility functions and constants used across the application.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ges-baseline-quiz-client.git
   cd ges-baseline-quiz-client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     REACT_APP_GOOGLE_SHEET=<Your Google Sheet URL>
     ```
   - For Google Sheet API code and Sheet configuration (column names), please contact author.

## Scripts

- **Start the development server**:

  ```bash
  npm start
  ```

  This will start the application on `http://localhost:3000`.

- **Build the application**:

  ```bash
  npm run build
  ```

  This will create an optimized production build in the `build` directory.

- **Run tests**:

  ```bash
  npm test
  ```

  This will execute the test suite using Jest.

- **Eject the configuration**:
  ```bash
  npm run eject
  ```
  Note: This is a one-way operation. Use it if you need to customize the build configuration.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or feedback, please contact [me](junyap0122@gmail.com).
