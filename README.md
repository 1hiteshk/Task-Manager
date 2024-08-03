- After login/signup click on a specifc project card to create Tasks specific to a project, 
- or create a project then click on project card to create new tasks,
- Calendar to see and sort tasks based on selected date and expiration date
  
First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

##Features Calendar Component: A fully functional calendar component to view and select dates. 
##Date Navigation: Navigate through different weeks. 
##Date Selection: Click on a date to select it. 
##Add Task Modal: Open a modal to add tasks for a selected date. 
##Task Management: 
##Task List: Display a list of tasks for the selected date. 
##Task Modal: A modal for adding and editing tasks. 
##Chakra UI Integration: Utilizes Chakra UI for responsive and accessible component styling. 
##TypeScript: Fully typed with TypeScript for better developer experience and code quality. 
##Testing: Unit tests using Jest and React Testing Library.

# After Login or sign up
# new users can create a project and can add task to that project and also can delete or update
# users can delete or update projects also, if a project is deleted then it's related task will also be deleted
# Users can click on project card to see more details and calendar specific dates.
# By picking a date user will only be shown the tasks whose expiration date is not beyond current date of today
# User can also filter or can sort task on the basis of task Status whether completed or not
# There is a confirmation before deleting for better user experience
# A toast to update the user if project or task is deleted
