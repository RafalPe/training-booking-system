# Training Booking System

A modern training reservation system built with a focus on Clean Architecture, full TypeScript type safety, and Pixel Perfect design.

## 🚀 Features

* **Advanced Booking Form**: Handles personal data, age (via custom slider), photo upload, and workout schedule (date and time).
* **Holiday API Integration**: Automatically fetches Polish public holidays using the API Ninjas service.
* **Intelligent Calendar**:
    * Blocks Sundays and National Holidays.
    * Disables past dates to ensure valid bookings.
    * Displays information for `OBSERVANCE` type holidays upon selection.
* **Notification System**: Integrated Toast Provider to inform users about form submission status.
* **Data Validation**: Comprehensive validation for all form fields (required fields, email formatting) without external form libraries.
* **FormData Submission**: Transmits complete form data (including binary files) to the server endpoint using `multipart/form-data`.

## 🛠️ Tech Stack

* **React 19**: Utilizing the latest features of the React library.
* **Tailwind CSS 4.1**: Modern styling using the latest CSS-first engine.
* **TypeScript**: Strict typing across the entire project (no `any` policy).
* **Vite**: Fast development environment and optimized build pipeline.
* **date-fns**: Lightweight library for date manipulation.
* **Husky & lint-staged**: Automated code quality checks before every commit.

## 🏗️ Architecture

The project is divided into layers to ensure readability and maintainability:
* **Custom Hooks**: Business logic isolation from the presentation layer (`useTrainingForm`, `useCalendar`, `useHolidays`).
* **Services**: Dedicated layer for external API communication.
* **Context API**: Global management for Toast notifications.

## 🔧 Installation and Setup

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables in a `.env` file:
    ```env
    VITE_HOLIDAYS_API_KEY=your_api_key_here
    VITE_HOLIDAYS_API_URL=https://api.api-ninjas.com/v1/holidays
    ```
4.  Run the application:
    ```bash
    npm run dev
    ```

## 🌍 Deployment

The application is configured for deployment on the **Vercel** platform. 
