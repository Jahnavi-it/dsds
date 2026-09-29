const T = (title, notes) => ({ title, notes });

const html = [
  T('HTML Basics and Document Structure', ['A page starts with <!DOCTYPE html> and has <html>, <head> and <body>.', 'The head holds the title, meta tags and links; the body holds the visible content.', 'Tags usually come in pairs like <p></p>; some are self-closing like <img> and <br>.']),
  T('Text, Links and Images', ['Headings are h1 to h6, p is a paragraph, strong and em give emphasis.', 'Link: <a href="url">text</a>. Image: <img src="pic.jpg" alt="description">.', 'Always write alt text for accessibility.']),
  T('Lists and Tables', ['ul is an unordered list, ol is ordered and li is a list item.', 'A table uses table, tr (row), th (heading cell) and td (data cell); thead and tbody group rows.', 'colspan and rowspan merge cells.']),
  T('Forms and Input Types', ['A form has action and method attributes; inputs include text, password, email, number, checkbox, radio and date.', 'Connect a label to an input with for and id; also use select, textarea and button.', 'required, placeholder and pattern give simple built-in validation.']),
  T('Semantic HTML', ['Semantic tags: header, nav, main, section, article, aside and footer.', 'They describe the meaning of content, which helps SEO and screen readers.', 'Prefer semantic tags over many plain div elements.']),
  T('Block vs Inline Elements', ['Block elements (div, p, h1) start on a new line and take the full width.', 'Inline elements (span, a, img) flow within a line and take only the needed width.', 'inline-block sits in a line but accepts width and height.']),
  T('Multimedia and iframes', ['audio and video tags with the controls attribute add players; source gives file options.', 'iframe embeds another page such as a map or a video.', 'Use loading="lazy" on images and iframes to speed up the page.']),
  T('HTML5 Features', ['HTML5 adds canvas, SVG, semantic tags, new input types and audio/video.', 'Web storage: localStorage keeps data permanently, sessionStorage until the tab closes.', 'data-* attributes store custom data on elements; the Geolocation API gets the location with permission.']),
  T('Accessibility and SEO Basics', ['Use alt text, labels for inputs and a logical heading order (one h1).', 'ARIA attributes help assistive technology when native tags are not enough.', 'A clear title and meta description help search engines.']),
  T('HTML Interview Questions', ['id must be unique on a page; class can be used on many elements.', 'script async downloads and runs as soon as ready; defer runs after the HTML is parsed, in order.', 'div is a block container and span is an inline container with no meaning of its own.'])
];

const css = [
  T('CSS Basics and Selectors', ['CSS can be inline, internal (style tag) or external (linked file); external is best.', 'Selectors: element, .class, #id, descendant (a b) and child (a > b).', 'Specificity order: inline style > id > class > element.']),
  T('Box Model', ['Every element is a box: content, padding, border and margin.', 'box-sizing: border-box makes width include padding and border.', 'Vertical margins of neighbouring blocks can collapse into one.']),
  T('Colors, Fonts and Units', ['Colors: names, hex (#3b5bdb), rgb() and hsl().', 'Units: px is fixed; em is relative to the parent font size; rem to the root font size; vw and vh to the viewport.', 'Use font-family with a fallback list.']),
  T('Display and Positioning', ['Position values: static, relative, absolute, fixed and sticky.', 'An absolute element is placed relative to the nearest positioned ancestor.', 'z-index controls stacking order for positioned elements.']),
  T('Flexbox', ['display: flex makes a flex container; flex-direction sets the main axis.', 'justify-content aligns along the main axis and align-items along the cross axis.', 'Use gap for spacing and flex: 1 to share space equally.']),
  T('CSS Grid', ['display: grid with grid-template-columns: repeat(3, 1fr) makes three equal columns.', 'Grid is two-dimensional (rows and columns); flexbox is one-dimensional.', 'Use gap, grid-area and minmax() for flexible layouts.']),
  T('Responsive Design and Media Queries', ['Add <meta name="viewport" content="width=device-width, initial-scale=1"> in the head.', 'Media query example: @media (max-width: 768px) { ... }.', 'Mobile-first means writing base styles for small screens and adding queries for larger ones.']),
  T('Pseudo-classes and Pseudo-elements', ['Pseudo-classes: :hover, :focus, :first-child and :nth-child(n).', 'Pseudo-elements ::before and ::after add generated content using the content property.', 'Pseudo-elements use a double colon; pseudo-classes use a single colon.']),
  T('Transitions and Animations', ['transition animates a property change smoothly, for example transition: background 0.3s.', '@keyframes with the animation property creates multi-step animations.', 'transform functions: translate, rotate and scale.']),
  T('CSS Variables and Frameworks', ['Define --main-color in :root and use it with var(--main-color).', 'Sass adds nesting and variables and compiles to CSS.', 'Bootstrap and Tailwind CSS speed up styling with ready-made classes.']),
  T('CSS Interview Questions', ['display: none removes the element from the layout; visibility: hidden hides it but keeps its space.', 'Centre a div using flex with justify-content and align-items set to center.', 'A CSS reset removes browser default styles; normalize makes them consistent.'])
];

const javascript = [
  T('JavaScript Basics', ['JavaScript runs in the browser and on servers with Node.js.', 'Declare variables with let and const; avoid var in new code.', 'It is dynamically typed: a variable can hold different types over time.']),
  T('Data Types and Type Coercion', ['Primitives: string, number, boolean, null, undefined, symbol and bigint; objects are non-primitive.', 'typeof null returns object (a known quirk).', '== converts types before comparing, === does not; prefer ===.']),
  T('Operators and Control Flow', ['Control flow: if-else, switch, for, while and do-while.', 'Falsy values: 0, empty string, null, undefined, NaN and false; everything else is truthy.', 'Ternary a ? b : c and nullish coalescing ?? give short conditions.']),
  T('Functions and Arrow Functions', ['Functions can be declarations, expressions or arrow functions (a, b) => a + b.', 'Arrow functions do not have their own this.', 'Default parameters, rest (...args) and spread (...arr) make functions flexible.']),
  T('Scope, Hoisting and Closures', ['var is function-scoped; let and const are block-scoped.', 'Declarations are hoisted; let and const stay in the temporal dead zone until declared.', 'A closure is a function that remembers variables from its outer scope.']),
  T('this, call, apply and bind', ['The value of this depends on how a function is called.', 'call and apply run a function with a chosen this; bind returns a new function with this fixed.', 'In a method call this is the object before the dot.']),
  T('Arrays and Array Methods', ['map transforms, filter selects, reduce combines, forEach loops, find returns the first match.', 'slice returns a copy of a part without changing the array; splice changes the array.', 'sort without a compare function sorts as strings.']),
  T('Objects, Destructuring and Spread', ['Objects store key-value pairs; access with obj.key or obj["key"].', 'Destructuring: const { a, b } = obj; spread copies: { ...obj }.', 'Optional chaining obj?.a?.b avoids errors on missing values.']),
  T('Prototypes and Classes', ['Objects inherit through the prototype chain.', 'class is cleaner syntax over prototypes; use extends and super for inheritance.', 'The constructor method runs when new creates an object.']),
  T('Promises and async/await', ['A Promise is pending, fulfilled or rejected; use then and catch.', 'An async function always returns a promise; await pauses inside it until the promise settles.', 'Use try/catch around await for error handling; Promise.all runs promises in parallel.']),
  T('Event Loop', ['JavaScript is single-threaded; the call stack runs code and async work goes through queues.', 'Promise callbacks (microtasks) run before setTimeout callbacks (macrotasks).', 'setTimeout(fn, 0) still runs after the current code finishes.']),
  T('DOM Manipulation', ['Select with getElementById or querySelector; create with createElement and add with appendChild.', 'textContent is safe for text; innerHTML parses HTML and can cause XSS.', 'classList.add and classList.toggle change CSS classes.']),
  T('Events', ['addEventListener attaches handlers such as click, input and submit.', 'Events bubble from the target up to parents; capturing goes the other way.', 'Event delegation puts one listener on a parent; preventDefault stops default actions such as form submit.']),
  T('ES6+ Features', ['Template literals use backticks: `Hello ${name}`.', 'Modules use import and export; Map and Set are new collections.', 'Also learn destructuring, spread, optional chaining and default parameters.']),
  T('JSON, Fetch and Web Storage', ['JSON.stringify converts an object to text and JSON.parse converts it back.', 'fetch returns a promise; call response.json() to read the data.', 'localStorage keeps data after closing the browser; sessionStorage only for the tab.']),
  T('Error Handling and Debugging', ['Use try, catch, finally and throw new Error("message").', 'Common errors: ReferenceError, TypeError and SyntaxError.', 'Use console.log, breakpoints and the Network tab in browser developer tools.']),
  T('JavaScript Interview Traps', ['NaN is not equal to itself; use Number.isNaN.', '0.1 + 0.2 is not exactly 0.3 because of floating-point precision.', 'var in a loop with setTimeout prints the same final value; let creates a new variable per round.'])
];

const react = [
  T('React Basics and JSX', ['React is a component-based library for building user interfaces.', 'JSX looks like HTML but is JavaScript; use className instead of class.', 'A component must return one root element (or a fragment).']),
  T('Components and Props', ['Function components are the modern standard.', 'Props pass data from parent to child and are read-only.', 'The children prop holds nested content.']),
  T('State with useState', ['State is data that changes; updating it re-renders the component.', 'Never change state directly; use the setter function.', 'Use setCount(prev => prev + 1) when the new value depends on the old one.']),
  T('Events and Forms', ['Handlers such as onClick and onChange receive an event object.', 'A controlled input keeps its value in state through value and onChange.', 'Call event.preventDefault() in the form submit handler.']),
  T('Conditional Rendering and Lists', ['Use ternary or && to show elements conditionally.', 'Render lists with map and give each item a unique key.', 'Avoid the array index as key when the list order can change.']),
  T('useEffect', ['useEffect runs side effects such as fetching data or timers.', 'Dependency array: [] runs once after the first render; [x] runs when x changes.', 'Return a cleanup function to remove listeners or timers.']),
  T('Other Hooks', ['useRef keeps a value or DOM reference without re-rendering.', 'useMemo caches a computed value; useCallback caches a function.', 'Call hooks only at the top level of components and custom hooks.']),
  T('Lifting State and Context', ['When siblings need the same data, lift state to their nearest common parent.', 'Context shares data without passing props through every level (prop drilling).', 'useReducer helps when state logic gets complex.']),
  T('React Router', ['BrowserRouter, Routes, Route and Link create client-side navigation without page reloads.', 'useParams reads URL parameters and useNavigate moves programmatically.', 'Protect private pages by redirecting when the user is not logged in.']),
  T('Performance and Virtual DOM', ['React compares a virtual DOM with the previous one and updates only what changed.', 'React.memo skips re-rendering when props do not change.', 'Stable keys and splitting large components reduce unnecessary work.']),
  T('React Interview Questions', ['Props are read-only inputs from the parent; state is data owned by the component.', 'Controlled inputs use state; uncontrolled inputs use refs.', 'Keys help React identify which list items changed.'])
];

const nodejs = [
  T('Node.js Basics', ['Node.js runs JavaScript outside the browser using the V8 engine.', 'It is event-driven and non-blocking, good for I/O-heavy apps.', 'npm is the package manager that comes with Node.']),
  T('Modules and npm', ['CommonJS uses require; ES modules use import.', 'package.json lists dependencies and scripts; node_modules stores installed packages.', 'Use npm install name and npm run script.']),
  T('Async Programming in Node', ['Async patterns: callbacks, promises and async/await.', 'fs.promises reads files without blocking the server.', 'One main thread handles requests; libuv uses a thread pool for heavy I/O.']),
  T('Express Basics', ['Express is a minimal web framework: app.get, app.post, app.listen.', 'A route handler receives req and res; use res.json to send JSON.', 'req.params, req.query and req.body read input.']),
  T('Middleware', ['Middleware is a function (req, res, next) that runs before route handlers.', 'express.json() parses JSON request bodies; the order of middleware matters.', 'An error-handling middleware has four arguments (err, req, res, next).']),
  T('REST API Design', ['Use nouns in URLs; GET reads, POST creates, PUT or PATCH updates, DELETE removes.', 'Status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.', 'Return JSON and keep responses consistent.']),
  T('Authentication with JWT', ['Hash passwords with bcrypt; never store plain passwords.', 'A JWT is a signed token the client sends in the Authorization header.', 'A middleware verifies the token and attaches the user to the request.']),
  T('Databases with Node', ['SQL options: SQLite, MySQL and PostgreSQL; NoSQL option: MongoDB with Mongoose.', 'Use parameterized queries to prevent SQL injection.', 'Keep secrets and connection strings in environment variables.']),
  T('Backend Security Basics', ['Enable CORS only for trusted origins and use the helmet package for safe headers.', 'Validate all input and add rate limiting on login routes.', 'Never commit the .env file to Git.'])
];

const webfund = [
  T('How the Web Works', ['The browser looks up the domain with DNS, opens a TCP and TLS connection and sends an HTTP request.', 'The server sends a response and the browser renders HTML, CSS and JavaScript.', 'Client is the browser; server stores data and logic.']),
  T('HTTP Methods and Status Codes', ['GET reads data and can be cached; POST sends data to create something.', '2xx success, 3xx redirect, 4xx client error, 5xx server error.', 'PUT replaces, PATCH updates part and DELETE removes a resource.']),
  T('REST vs GraphQL', ['REST uses several endpoints, one per resource.', 'GraphQL uses one endpoint and the client asks for exactly the fields it needs.', 'REST is simpler; GraphQL avoids over-fetching and under-fetching.']),
  T('Cookies, Sessions and Tokens', ['Cookies are small data stored in the browser and sent with requests.', 'A session keeps user data on the server and a cookie stores the session id.', 'JWT is stateless: the token itself carries the user information.']),
  T('CORS and Same-Origin Policy', ['A browser blocks requests to another origin (domain, protocol or port) by default.', 'CORS headers from the server tell the browser which origins are allowed.', 'The preflight OPTIONS request checks permission for some requests.']),
  T('Git and GitHub', ['Basic flow: git init, git add, git commit, git push and git pull.', 'Branches let you work on features separately; merge or use a pull request to combine.', 'Use .gitignore to keep node_modules and .env out of the repository.']),
  T('Deployment Basics', ['Build the frontend and host it on Netlify or Vercel; host the backend on Render or a similar service.', 'Set environment variables on the host instead of in code.', 'Use HTTPS and a custom domain for production.']),
  T('Web Security Basics', ['XSS: escape output and avoid injecting raw HTML.', 'CSRF: use tokens and SameSite cookies; SQL injection: use parameterized queries.', 'Always use HTTPS and hash passwords.']),
  T('Web Performance and SEO', ['Minify and compress files, lazy load images and use caching.', 'Use a proper title, meta description and semantic HTML for SEO.', 'Check your site with Lighthouse in Chrome developer tools.'])
];

module.exports = [
  { id: 'html', icon: '🧾', topics: html },
  { id: 'css', icon: '🎨', topics: css },
  { id: 'javascript', icon: '📜', topics: javascript },
  { id: 'react', icon: '⚛️', topics: react },
  { id: 'nodejs', icon: '🟢', topics: nodejs },
  { id: 'webfund', icon: '🔗', topics: webfund }
];