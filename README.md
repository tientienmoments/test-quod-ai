## Description

Web app listed 5 github issues per page with forward and backward Pagination.
User can be able to toggle the highlighted issues and see that as new feed notification in navbar and beside the highlight function, user also can move to next pagination pages and come back, they are still able to see which has already chosen.
**DEMO**
[Link](https://github-issues-test.netlify.app/)

## Dependencies

- react-bootrap : framework for styling
- font-awesome: notification icon
- axios: fetching Github's api
- redux : to store the most recent 5 highlighted issue

## Setup and run app

```
git clone https://github.com/tientienmoments/test-quod-ai.git
cd test-quod-ai
npm install
npm start
The app is running on <http://localhost:3000/>
```

**Technical decision**

- How did you implement styling? What are the pros and cons? Why did you chose this approach?
  => I am using React Bootstrap and Sass for the styling. In my point of view, it is more convenient to arrange and manage the style.

- How did you share state between components? What are the pros and cons? Why did you chose this approach?
  For Example:
  I am trying to save and sharing the issues state
  `const [issues, setIssues] = useState("");`

1. I save all the data after fetching to `issues`
   `setIssues(data.data);`
2. Then, I share these data by change this state `issues` to become props
   in `<IssueItem **issues={issues}** handleClickOnIssue={handleClickOnIssue} currHighlightedIssue={currHighlightedIssue} />`
3. In the Issue component, I already have all the information ready use after mapping.

I am using lifting state up method from parent component to children component for more easily to control the data and logic.

- Did you use React hooks? Why or why not?
  Yes. I do. Such as: useState, useSelector, useDispatch, useEffect
  Coz:
  - I am coding by functional component
  - Code is cleaner
  - Reuse the data and logic
- What would you improve?

=> Need to fetch the api in action if you need to expand the app

- How did you prevent wasted renders?
  useEffect: only re-render for the changing or updating part
- How did you handle side-effects (e.g. data fetching)? What are the pros and cons? Why did you chose this approach?

1. I fetched data using axios inside useEffect and update data every single time call api from github
2. Using useState to save data
3. And then display data
