export const blogPosts = [
  {
    title: "Spring 2022",
    date: "January 11th, 2022",
    body: (
      <>
        <p>
          Welcome to the Spring 2022 term. In this update we have added a new budget tracking feature. This allows the
          executive team to have an accurate count of the amount of money earned throughout a semester. If you have
          questions or find issues with any features please contact a club admin who can forward the message off to us.
          Our email also is <b>uwpokerclub@gmail.com</b>.
        </p>

        <ul className="blog-list">
          <li>
            Added more configuartion options when creating a semester. New values include the starting budget of the
            term, the cost of a membership, the cost of a discounted membership, and the cost of a rebuy.
          </li>

          <li>
            The semester dashboard now displays configuration information at the top of the page, as well as the current
            budget for the term.
          </li>

          <li>
            When registering a membership, there is now an additional checkbox to indicate the membership is discounted.
          </li>

          <li>Additionally, a new button has been added to toggle a member as discounted.</li>

          <li>
            Added a new table to track various transactions made with club money. Enter negative amounts to represent
            the club purchasing something, and positive amounts to represent the club receiving money (i.e from WUSA).
          </li>

          <li>
            On the event page, a member&apos;s number of rebuys is now being tracked, with a button to increase the
            count by one.
          </li>

          <li>
            All of these actions will update the current budget of the semester on the fly, so you will always have an
            accurate account of how much money is in the club.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Winter 2020",
    date: "January 4th, 2020",
    body: (
      <>
        <p>
          This is the first of many app development update posts. In this section you will find a comprehensive list of
          all new features and bug fixes that have been worked on during the previous semester. If you have any
          questions or find any issues please email <b>uwpokerclub@gmail.com</b>
        </p>

        <ul className="blog-list">
          <li>Added new UI to create a semester. This can be found on the semesters tab.</li>
          <li>Added three new buttons to the index page to easily create new semesters, events, and members.</li>
          <li>
            Added a new UI to edit a member. Clicking the update button when viewing a semester will display this page.
          </li>
          <li>
            Added a new UI to register members for an event. This UI allows you to register multiple members at one
            time.
          </li>
          <li>Added a new button to remove a member from an event. This is displayed beside the sign out button.</li>
          <li>Fixed an issue where the faculty field when updating a member wasn&apos;t displaying as a selector.</li>
          <li>Fixed an issue where a user&apos;s last semester registered could not be updated.</li>
          <li>Fixed an error where viewing the rankings for a semester would produce a server error.</li>
          <li>
            Fixed an issue where the term selector filters on the members and events page were not working properly.
            Selecting a term should now filter those lists to show results only for that term. Selecting all will show
            all semesters.
          </li>
        </ul>
      </>
    ),
  },
];
