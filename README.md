For the blogging application requested by the interviewer, I structured the project by creating components, pages, and utility functions (located in the 'utils' directory containing different functions). To manage data fetching, I implemented hooks using React Query.

Upon loading the application, users are directed to the front page, providing an overview of recent news and categorized posts, including topics like nature, sports, and news on cars. On the right end of the recent blog post cplumn, there is a section providing a link to view all blog posts as well.

To perform efficient CRUD (Create, Read, Update, Delete) operations, user registration are required. You can register by clicking the register link on the navbar. Upon registration, the necessary links appear in the header, enabling users to view their uploaded blog posts and thereafter edit, and delete them. The user ID plays a crucial role in these operations, ensuring that users can manage their specific posts.Also each blogposts can be viewed for more details. However search functionality cant be done because the API integration for that is not available.

To enhance user experience, user data is stored in local storage, providing a seamless and personalized interaction with the application.
