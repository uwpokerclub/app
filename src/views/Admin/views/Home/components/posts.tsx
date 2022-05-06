import React from "react";

const blogPosts = [
  {
    title: "Winter 2020",
    date: "January 4th, 2020",
    body: (
      <>
        <p>
          This is the first of many app development update posts. In this
          section you will find a comprehensive list of all new features and
          bug fixes that have been worked on during the previous semester.
          If you have any questions or find any issues please email{" "}
          <b>uwpokerclub@gmail.com</b>
        </p>

        <ul className="blog-list">
          <li>
            Added new UI to create a semester. This can be found on the
            semesters tab.
          </li>
          <li>
            Added three new buttons to the index page to easily create new
            semesters, events, and members.
          </li>
          <li>
            Added a new UI to edit a member. Clicking the update button when
            viewing a semester will display this page.
          </li>
          <li>
            Added a new UI to register members for an event. This UI allows
            you to register multiple members at one time.
          </li>
          <li>
            Added a new button to remove a member from an event. This is
            displayed beside the sign out button.
          </li>
          <li>
            Fixed an issue where the faculty field when updating a member
            wasn't displaying as a selector.
          </li>
          <li>
            Fixed an issue where a user's last semester registered could not
            be updated.
          </li>
          <li>
            Fixed an error where viewing the rankings for a semester would
            produce a server error.
          </li>
          <li>
            Fixed an issue where the term selector filters on the members
            and events page were not working properly. Selecting a term
            should now filter those lists to show results only for that
            term. Selecting all will show all semesters.
          </li>
        </ul>
      </>
    )
  }
];

export { blogPosts };