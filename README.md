GitHub pages URL:

https://nepomunezero.github.io/student_finance_tracker/


Chosen theme: Student Finance Tracker
A simple finance Tracker built to help a student manage their finances.
***********************************************************************



Features List:
Pages:
1. About page saying about me, my mission and why I build the webapp
2. Records Page presenging all the records in a table
3. Settings page allows to set some parameters manually
4. Add page allows you to add other expenses

Functionalities:
1. Dashboard stats allow you to view inputs by categories
2. Dashboard stats show you the most recent expenses in the 7 days
3. Records table allows you to convert the currencies to different currencies.
4. You are able to sort the expenses by Alphabet, Amount, and Date.
************************************************************************


Regex Catalog:
The Student Finance Tracker uses several regular expressions (regex) for input validation and search. The description/title field uses ^\S(?:.*\S)?$ to prevent leading/trailing spaces and collapse double spaces. Amount fields use ^(0|[1-9]\d*)(\.\d{1,2})?$ to allow numeric values with up to two decimals. Dates follow the YYYY-MM-DD format validated by ^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$. Category/tag inputs accept letters, spaces, and hyphens via ^[A-Za-z]+(?:[ -][A-Za-z]+)*$.

An advanced regex \b(\w+)\s+\1\b detects consecutive duplicate words to prevent repeated entries. Finally, the live search compiles dynamic user-provided regex patterns to highlight matches in the table using <mark>, while being safely wrapped in try/catch for error handling. These patterns ensure clean, consistent input and powerful search functionality throughout the application.
************************************************************************



Keyboard Notes:
Tab / Shift + Tab – Move forward/backward through interactive elements (links, buttons, form fields).

Enter / Space – Activate buttons or select checkboxes and links.

Arrow Keys – Navigate within table cells or dropdown menus (if implemented).
************************************************************************



a11y notes:
Semantinc HTML
Keyboard navigation
ARIA Roles & Live Regions
***********************************************************************



How to run tests: 
First start by setting the Currency conversion rate to use, and the Monthly spending cap in the Settings
********************************************************************************************************


Citation:
ChatGPT: usage for understanding concepts, modifying the logic and ambelishing the code.
Google: For explanations and conventional implementations.
********************************************************************************************************